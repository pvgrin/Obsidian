---
Type: Meta/Type/Metadata
Description: "Общее описание метаданных" 
Tags:
  - Meta/Metadata
  - Meta/Infrastructure
Notes:
  Settings:
    Type: Meta/Type/Settings
    Description: ""
    Template: ""
    Templater: ""
  SimpleNote:
    Type: Meta/Type/SimpleNote
    Description: "Простая заметка"
---
#Meta/Metadata #Meta/Infrastructure
###  Verification
```dataviewjs
const page = dv.current();
let result = ""

// Notes
result += 
	ckeckBlock("Meta",
		check(
			page.Type != null,
				"Type: " + page.Type)) +
	ckeckBlock("Notes",
		ckeckBlock("Settings",
			check(
				page.Notes.Settings.Type != null,
				"Type: " + page.Notes.Settings.Type, 
			check(
				page.Notes.Settings.Description != null,
				"Description"))) +
		ckeckBlock("SimpleNote",
			check(
				page.Notes.SimpleNote.Type != null,
				"Type",
			check(
				page.Notes.SimpleNote.Description != null,
				"Description"))));

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
### Metadata Notes
```dataview
table Description, Type, file.etags as Tags, Version, Template
from #Meta/Metadata
```
