module.exports = InsertNote;
// Insert into current note a new content from the file {$noteFileName}
// into specified position {$insertPos}
// if (insertPos is undefined) - inserting in the current cursor position
// if (insertPos >= length of current note) - append in end of current note
// if (insertPos <= 0) - insert note content into begin of current note    
async function InsertNote(tp, tR, noteFileName, insertPos) {
    console.log(">>app: ", app);
    console.log(">>app.workspace: ", app.workspace);
    console.log(">>app.vault: ", app.vault);
    console.log(">>app.plugins.plugins: ", app.plugins.plugins);
    
    const dvApi = app.plugins.plugins.dataview.api;
	console.log(">>dvApi: ", dvApi);

	// utilities routines
	let utils = tp.user.Utils(tp, tR);
	console.log(">>utils:\n", utils);

    console.log(">>tp:\n", tp);
    console.log(">>tp.frontmatter:\n", tp.frontmatter);

    // Active file
    let af = tp.config.target_file; //app.workspace.getActiveFile();
	console.log(">>af: ", af);
    if (!af) {
        log.logError(`workspace doesn't have an active file`);
        return;
    }

    const view = app.workspace.getActiveFileView();
    console.log(">>view: ", view);
    if (!view) {
        log.logError(`unable to get the active view`);
        return;
    }
    const editor = view.editor;
    console.log(">>editor: ", editor);
    if (!editor) {
        log.logError(`unable to get the editor`);
        return;
    }
    let cursor = editor.getCursor();
    console.log(">>cursor: ", cursor);
    let position = editor.posToOffset(cursor);
    console.log(">>position: ", position);

    // Check the file
    let file = tp.file.find_tfile(noteFileName);
    if (!file) {
        utils.notice(`error, File '${noteFileName}' not found.`);
        return;
    }
    console.log(">>file:\n", file);

    let fileContent = await app.vault.cachedRead(file);
    console.log(">>content:\n", fileContent);

    let currentContent = await app.vault.cachedRead(af);
    let newContent = "";
    if (insertPos == null)
        insertPos = position;

    if (insertPos <= 0) {
        newContent = fileContent + currentContent;
        insertPos = 0;
    }
    else if (insertPos >= currentContent.length) {
        newContent = currentContent + fileContent;
        insertPos = currentContent.length;
    }
    else {
        newContent = currentContent.substring(0, insertPos) + fileContent + currentContent.substring(insertPos);
    }
    console.log(">>newContent:\n", newContent);

    // Saving the new content 
    await app.vault.modify(af, newContent);

    // Set cursor position direct after the inserted text
    position = insertPos + fileContent.length;
    editor.setCursor(editor.offsetToPos(position));

    return;
}