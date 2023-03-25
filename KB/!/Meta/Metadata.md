---
#Общее описание метаданных
Meta:
  Note:
    Type:
    Description:
    Template:
    Templater:  
Notes:
  Settings:
    Type: 
    Description:
    Template:
    Templater:
  SimpleNote:
    Type: "#Meta/Type/SimpleNote" 
    Description: "Простая заметка"
---
#Meta/Metadata
###  Verification

```dataviewjs
const page = dv.current();
let result = ""

// Notes
result += 
	ckeckBlock("Notes",
		ckeckBlock("Settings",
			check(
				page.Notes.Settings.Type != null,
				"Type", 
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
