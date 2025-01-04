---
Type: Meta/Type/Index
Description: "Индекс по служебным инфраструктурным заметкам"
Version: "0.1"
Metadata: [[!/Meta/Structure/Index|Index]]
Tags:
  - Meta/MOC
  - Meta/Infrastructure
  - Meta/Type/Index
  - Meta/OutdatedTemplate 
---
#Meta/MOC #Meta/Infrastructure #Meta/Type/Index  #Meta/OutdatedTemplate 
## Последние правки в разделе "!"
```dataview
TABLE file.mtime as "Modified", file.etags as Tags, Topics
FROM "!"
WHERE file.name != "Index"
SORT file.mtime DESC
LIMIT [[Settings]].Index.RecentLen
```
