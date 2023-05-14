---
IndexLen: 10
---
#Meta/Infrastructure #Meta/Type/Index  #Meta/OutdatedTemplate 
```dataview
TABLE file.ctime as "Created", file.mtime as "Modified" 
FROM "Daily Notes"
WHERE file.name != "!ndex"
SORT file.mtime DESC
LIMIT this.IndexLen
```
