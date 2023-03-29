function exportUtils (tp, tR) {
    return new Utils(tp, tR);
}
module.exports = exportUtils;

class Utils {
	tp;
	tR;

	constructor(tp, tR) {
        this.tp = tp;
        this.tR = tR;    
    }

	getSettings(fileName) {
		let result = {};
		result.fileName = fileName;
		result.frontmatter = this.getFileFrontmatter(fileName);
		return result;
	}
	
	getFileFrontmatter(fileName) {
		const file = this.tp.file.find_tfile(fileName);
		if (!file)
			return {};
		return app.metadataCache.getFileCache(file)?.frontmatter || {};
	}

	notice(text) {
		new Notice("", 8e3).noticeEl.innerHTML =
			`<b>${this.tp.file.title}:</b><br/> ${text}`;
		return;
	}

	buildNote(tplContent, blocks,blockContentDelimiter) {
		let content = tplContent;
		for (let [blockName, block] of blocks) { 
			if (block.includes(blockContentDelimiter))
				block = block.split(blockContentDelimiter)[1].trim();
			content = content.replace("{{" + blockName + "}}", block);
		}
		return content;
	}

	async buildBlock(noteBlocksPath, blockName, mdFileExt) {
		const blockFileName = this.pathCombine(noteBlocksPath, blockName + mdFileExt);
		console.log(">>buildBlock:", blockFileName);
		return await this.openFile(blockFileName);
	}

	async openFile(fileName) {
		const file = this.tp.file.find_tfile(fileName);
		return await (file) ? app.vault.cachedRead(file) : null;
	}

	pathCombine(path, fileName) {
		if (!path)
			return fileName;
		if (!fileName)
			return path;
		return path + ((path.trim().endsWith("/")) ? "" : "/") + fileName;
	}

	findNoteBlocks(content) {
		const regex = /{{([\w\s\-]+)}}+/gmi;
		// Alternative syntax using RegExp constructor
		//const regex = new RegExp('{{([\\w\\s\\-]+)}}+', 'gmi')
		let res = [];
		let m;
		while ((m = regex.exec(content)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
				if (groupIndex == 1)
					res.push(match);
			});
		}
		return res;
	}
}
