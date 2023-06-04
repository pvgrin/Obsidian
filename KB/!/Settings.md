---
TestValue: 10
TestLink: "!/Settings"

dvDateTimeFormat: "yyyy-MM-dd HH:mm"

Templates:
  Folder: "!/Templates"
  BlocksFolder: "!/Templates/Blocks"
  NoteFrontmatter:
    Delimiter: "---"
  NoteTitleFormatter: '<%+ tp.file.title %>'
  NoteHeader:
    CreatedDateFormatter: '<%+ tp.file.creation_date("yyyy-MM-DD HH:mm") %>'
    ModifiedDateFormatter: '<%+ tp.file.last_modified_date("yyyy-MM-DD HH:mm") %>'
    PathFormatter: '<%+ tp.file.folder(true) %>'
  NoteStatistics:
    #Formatter: '<%+ tp.user.note_statistics_templater(tp, tR, "Note Statistic TBD!") %>'
    #Formatter: "```dataviewjs\n dv.el('b', 'Note Statistic TBD!');\n ```\n"
    Formatter: "\u0060\u0060\u0060dataviewjs\n dv.el('b', 'Note Statistic TBD!');\n \u0060\u0060\u0060\n"
  NoteContent:
    Delimiter: "%% === Note Content === %%"
  NoteFooter:
    Delimiter: "%% === Note Footer === %%"
  NoteBlock:
    Delimiter: "%% === NoteBlock Content === %%"
  Template:
    Delimiter: "%% === Template Content === %%"
DailyRecent:
  #Количество элементов в запросе самых последних редактируемых дневных заметок
  Length: 10
  NoteSpan:
    Start: "<span style='vertical-align: top; white-space: nowrap;'>"
    End: "</span>"
---

#Meta/Metadata 

###  Verification
```dataviewjs
const page = dv.current();
let result = ""

result += check(page.TestValue != null, "TestValue");
result += check(page.TestLink != null, "TestLink");
result += check(page.dvDateTimeFormat != null, "dvDateTimeFormat");

// Templates
result += 
	ckeckBlock("Templates",
		check(
			page.Templates.Folder != null,
			"Folder",
		check(
			page.Templates.BlocksFolder != null,
			"BlocksFolder",	
		ckeckBlock("NoteFrontmatter",
			check(
				page.Templates.NoteFrontmatter.Delimiter != null,
				"Delimiter")) +
		check(
			page.Templates.NoteTitleFormatter != null,
			"NoteTitleFormatter",
		ckeckBlock("NoteHeader",
			check(
				page.Templates.NoteHeader.CreatedDateFormatter != null,
				"CreatedDateFormatter",
			check(
				page.Templates.NoteHeader.ModifiedDateFormatter != null,
				"ModifiedDateFormatter",
			check(
				page.Templates.NoteHeader.PathFormatter != null,	
				"PathFormatter")))) +
		ckeckBlock("NoteStatistics",
			check(
				page.Templates.NoteStatistics.Formatter != null,
				"Formatter")) +	
		ckeckBlock("NoteContent",
			check(
				page.Templates.NoteContent.Delimiter != null,
				"Delimiter")) +		
		ckeckBlock("NoteFooter",
			check(
				page.Templates.NoteFooter.Delimiter != null,
				"Delimiter")) +
		ckeckBlock("NoteBlock",
			check(
				page.Templates.NoteBlock.Delimiter != null,
				"Delimiter")) +
		ckeckBlock("Template",
			check(
				page.Templates.Template.Delimiter != null,
				"Delimiter"))		
		))));
		
// DailyRecent
result +=
	ckeckBlock("DailyRecent",
		check(
			page.DailyRecent.Length == 10,
			"Length",
			
			ckeckBlock("NoteSpan", 
				check(
					page.DailyRecent.NoteSpan.Start != null,
					"Start",
				check(
					page.DailyRecent.NoteSpan.End != null,
					"End")))));

dv.el("ul", result);

function ckeckBlock(header, text){
	return `<li>${header}:<ul>${text}</ul></li>`
}

function check(success, valueName, text){
	const msg = success ? "ok." : "error!";
	const color = success ? "green" : "red";
	return `<li><span style='color: ${color};'> ${valueName} - ${msg}</span></li>${text ? text : ""}`;
}
```

