---
Type: Meta/Type/Metadata
Description: "Глобальный реестр проектов"
Version: "0.1"
Tags:
  - Meta/Structure
  - Meta/Metadata
  - Meta/Infrastructure
---
# Global Projects Registry
```dataview
TABLE WITHOUT ID 
	file.link as "Project"
	,Description as "Info"
	,split(Status, "/")[2] as "Status" 
	,dateformat(file.ctime,"dd.MM.yy") as "Created"
	,dateformat(file.mtime,"dd.MM.yy") as "Modified"
	,file.etags as Tags
	,Topics
	,Template.Version as "Version"
	,Metadata
from !"!"
where Type = "Meta/Type/ProjectNote"
sort file.name
```
