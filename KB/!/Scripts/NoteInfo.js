function exportNoteInfo (tp, tR, settings) {
    return new NoteInfo(tp, tR, settings);
}
module.exports = exportNoteInfo;

class NoteBlocks {
	frontmatter = "";
	content = "";
}
class TemplateInfo {
	name = "";
	version = "";
}
class NoteInfo {
	noteFrontmatterDelimiter = "---";
	noteContentDelimiter = "%% === Note Content === %%";
	noteFooterDelimiter = "%% === Note Footer === %%";

	tp;
	tR;
	settings;

	file;
	frontmatter;
	content;
	template = new TemplateInfo();
	version;
	blocks = new NoteBlocks();

	constructor(tp, tR, settings) {
        this.tp = tp;
        this.tR = tR;
		this.settings = settings;    

		if (!settings) {
			console.error(`NoteInfo.constructor invalid 'settings' argument value.`);
			return;
		}
		this.noteFrontmatterDelimiter =
			settings.frontmatter?.Templates?.NoteFrontmatter?.Delimiter;
		this.noteContentDelimiter =
			settings.frontmatter?.Templates?.NoteContent?.Delimiter;
		this.noteFooterDelimiter =
			settings.frontmatter?.Templates?.NoteFooter?.Delimiter;
    }

	getContent(delimTop, delimBottom) {
		if (!this.content)
			return;
		var blocks = this.splitBlocks();
		if (!delimTop && !delimBottom)
			return this.content;
		// если оба - между первым delimTop и последним delimBottom, 
		// если какого-то нет, то все с начала или до конца
		let result = "";
		if (delimTop && delimBottom) {
			let pos1 = (blocks.content.includes(delimTop)) ?
				blocks.content.indexOf(delimTop) + delimTop.length : 0;
			let pos2 = (blocks.content.includes(delimBottom)) ?
				blocks.content.lastIndexOf(delimBottom) : blocks.content.length;
			return blocks.content.substring(pos1, pos2);
		}
		// если задан только верхний - то, ниже первого верхнего
		if (delimTop) {
			if (blocks.content.includes(delimTop)) {
				const pos = blocks.content.indexOf(delimTop) + delimTop.length;
				result = blocks.content.slice(pos);
			}
			return result;
		}
		// если только нижний - выше, последнего нижнего
		if (delimBottom) {
			if (blocks.content.includes(delimBottom)) {
				const pos = blocks.content.lastIndexOf(delimBottom);
				result = blocks.content.substring(0, pos);
			}
			return result;
		}
		return result;
	}

	setContent(content) {
		this.content = content;
		this.initBlocks();
	}

	hasFrontmatter() {
		return (this.content.trim().indexOf(this.noteFrontmatterDelimiter) == 0);
	}

	splitBlocks() {
		let result = new NoteBlocks();
		if (this.hasFrontmatter()) {
			let cnt = this.content;
			let pos = cnt.indexOf(this.noteFrontmatterDelimiter);
			cnt = cnt.substring(pos + this.noteFrontmatterDelimiter.length);
			pos = cnt.indexOf(this.noteFrontmatterDelimiter);
			result.frontmatter = cnt.substring(0, pos)?.trim();
			result.content = cnt.substring(pos + this.noteFrontmatterDelimiter.length);
		}
		else {
			result.frontmatter = "";
			result.content = this.content;
		};
		result.frontmatter = (result.frontmatter) ? result.frontmatter.trim() : "";
		result.content = (result.content) ? result.content.trim() : "";
		return result;
	}

	initBlocks() {
		let blocks = this.splitBlocks();
		this.blocks.frontmatter = blocks.frontmatter;
		this.blocks.content =
			this.getContent(
				this.noteContentDelimiter,
				this.noteFooterDelimiter);
		return;
	}

	clone() {
		let result = new NoteInfo(this.tp, this.tR, this.settings);
	
		result.noteFrontmatterDelimiter = this.noteFrontmatterDelimiter;
		result.noteContentDelimiter = this.noteContentDelimiter;
		result.noteFooterDelimiter = this.noteFooterDelimiter;
		result.file = this.file;
		result.frontmatter = this.frontmatter;
		result.content = this.content;
		result.template.name = this.template.name;
		result.template.version = this.template.version;
		result.version = this.version;
		result.blocks.frontmatter = this.blocks.frontmatter;
		result.blocks.content = this.blocks.content;
		return result;
	}

	mergeFrontmatter(frontmatter) {
		// TODO: объединение текущего блока с переданным, 
		// с устранением дублей в ключах и вставкой значений из переданного блока 
		// пока просто объединение
		let fm = (this.blocks.frontmatter) ? this.blocks.frontmatter + "\n" : "";
		fm += frontmatter;
		return fm;
	}

	mergeBlocks(noteBlocks) {
		let result = this.clone();
		if (noteBlocks) {
			// frontmatter
			result.blocks.frontmatter =
				this.mergeFrontmatter(noteBlocks.frontmatter);
			// content
			result.blocks.content += noteBlocks.content;
		}
		return result;
	}

	embedBlocks() {
		// frontmatter
		let cnt = this.content;
		let pos = cnt.trim().indexOf(this.noteFrontmatterDelimiter);
		// есть блок frontmatter
		if (pos == 0) {
			// удаление всего блока frontmatter с разделителями
			pos = cnt.indexOf(this.noteFrontmatterDelimiter);
			cnt = cnt.substring(pos + this.noteFrontmatterDelimiter.length);
			pos = cnt.indexOf(this.noteFrontmatterDelimiter);
			cnt = cnt.substring(pos + this.noteFrontmatterDelimiter.length);
		}
		// добавление нового frontmatter
		let fm = this.noteFrontmatterDelimiter + "\n" +
			this.blocks.frontmatter + "\n" +
			this.noteFrontmatterDelimiter + "\n";
		// content 
		pos = cnt.indexOf(this.noteContentDelimiter);
		if (pos >= 0) {
			let fpos = cnt.indexOf(this.noteFooterDelimiter);
			if (fpos == -1)
				fpos = cnt.length;
			pos += this.noteContentDelimiter.length;
			// копируем все, кроме контента, контент новый
			cnt = cnt.substring(0, pos) +
				this.blocks.content + "\n" +
				cnt.substring(fpos);
		}
		else
			cnt = this.blocks.content;
		return this.content = fm + cnt;
	}

	async setFile(file) {
		if (!file) {
			console.error(`NoteInfo.setFile invalid argument.`);
			return;
		}
		this.file = file;
		this.setContent(await app.vault.cachedRead(file));
		this.frontmatter =
			await app.metadataCache.getFileCache(file)?.frontmatter || {};
		this.template.name =
			this.frontmatter.Template?.Name || "";
		this.template.version =
			this.tp.user.VersionInfo(this.tp, this.tR, this.frontmatter.Template?.Version || "");
		this.version =
			this.tp.user.VersionInfo(this.tp, this.tR, this.frontmatter?.Version || "");
	}	
}
