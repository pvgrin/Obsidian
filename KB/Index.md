---
Metadata: [[!/Meta/Structure/Index|Index]]
---
#Meta/MOC #Meta/Infrastructure #Meta/Type/Index  #Meta/OutdatedTemplate 
## Последние правки в ежедневных заметках
```dataview
TABLE file.mtime as "Modified", file.etags as Tags, Topics
FROM "Daily Notes"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT [[Settings]].Index.RecentLen
```
