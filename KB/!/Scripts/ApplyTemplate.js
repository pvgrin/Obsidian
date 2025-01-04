
module.exports = applyTemplate;
async function applyTemplate(tp, tR, useTemplate = true) {
	const dvApi = app.plugins.plugins.dataview.api;
	console.log(">>dvApi: ", dvApi);

	// utilities routines
	let utils = tp.user.Utils(tp, tR);
	console.log(">>utils:\n", utils);

	// Global settings initialization
	var settings = await utils.getSettings("!/Settings");
	console.log(">>settings:\n", settings);
	var metadata = await utils.getSettings("!/Meta/Metadata");
	console.log(">>metadata:\n", metadata);

	// Active note
	note = tp.user.NoteInfo(tp, tR, settings);
	console.log(">>note: ", note);

	// Read current note content, define the template based on and 
	// the version of the template, apply the new version to the note
	// Read template info from the active file metadata
	let af = app.workspace.getActiveFile();
	console.log(">>af: ", af);
	await note.setFile(af);

	// search the template file by name in the template's folder
	// if file is not found, exit with error message - template not found 
	let fileName;
	let file;
	let template;
	if (useTemplate) {
		fileName = 
			utils.pathCombine(
				settings.frontmatter?.Templates?.Folder || "",
				note.template.name);
		file = tp.file.find_tfile(fileName);
		if (!file) {
			utils.notice(`error, template '${fileName}' not found.`);
			return "";
		}
		template = tp.user.NoteInfo(tp, tR, settings);
		// Template reading
		await template.setFile(file);
		console.log(">>template: ", template);

		// Check the template's version
		let cmpRes = template.version.compare(note.template.version);
		if (cmpRes < 0) {
			utils.notice(
				`error, template '${fileName}' has a low version ` + 
				`(version: "${template.version.toString()}").`);
			return "";
		}
	}

	// Apply the template to active note 
	const templatesPath = settings.frontmatter?.Templates?.Folder;
	console.log(">>templatesPath: ", templatesPath);
	const noteBlocksPath = settings.frontmatter?.Templates?.BlocksFolder;
	console.log(">>noteBlocksPath: ", noteBlocksPath);
	const mdFileExt = ".md";
	// ToDo: build the blocks list automatically by scanning the template's content   
	const blockContentDelimiter = settings.frontmatter?.Templates?.NoteBlock?.Delimiter;
	const templateContentDelimiter = settings.frontmatter?.Templates?.Template?.Delimiter;

	let tplContent;
	if (useTemplate) {
		tplContent = 
			(template.content.includes(templateContentDelimiter)) ?
				template.content.split(
					templateContentDelimiter)[1]?.trim() || "" : 
				template.content;
	} else {
		tplContent = note.content;
	}
	console.log(">>tplContent:\n", tplContent);

	// Blocks processing
	const maxBlockRecursionDeep = 10; //ToDo: move to settings
	let breakBlockProcessing = false;
	let blockNames;
	let pBlocks = new Map(); // processed blocks
	let blockCount = 0; // count of processed blocks
	while (((blockNames = utils.findNoteBlocks(tplContent)).length > 0) &&
		!breakBlockProcessing) {
		const blocks = new Map();
		let sbp = tp.user.StandardBlockProcessor(tp, tR, note);
		for (const blockName of blockNames.values()) {
			var p = utils.buildBlock(noteBlocksPath, blockName, mdFileExt);
			p.then((block) => 
				blocks.set(blockName, 
					(block) ?? (sbp.process(blockName) ?? `==(Error: the block "${blockName}" not found)==`)));
			await p;
			// maximum recursion depth
			let deep = (pBlocks.get(blockName) ?? 0) + 1;
			pBlocks.set(blockName, deep);
			breakBlockProcessing = (deep > maxBlockRecursionDeep);
			if (breakBlockProcessing)
				console.error(`Error: max recursion deep for the block "${blockName}" reached (${maxBlockRecursionDeep}).`)
			blockCount = blockCount + 1;
		}
		// To check blocks in blocks
		tplContent = utils.buildNote(tplContent, blocks, blockContentDelimiter);
	}

	let msg = ``;
	if (useTemplate) {
		let tmpNote = tp.user.NoteInfo(tp, tR, settings);
		tmpNote.setContent(tplContent);
		console.log(">>tmpNote: ", tmpNote);
		let resNote = tmpNote.mergeBlocks(note.blocks);
		resNote.embedBlocks();
		console.log(">>resNote: ", resNote);
		tplContent = resNote.content;
		msg = `template '${template.file.basename}' was successfully applied.\n`;
	}
	msg += (blockCount > 0) ? 
		`${blockCount} note blocks was successfully processed.` : 
		`No processing blocks found.`;

	await app.vault.modify(note.file, tplContent);
	utils.notice(msg);
	
	return "";
}