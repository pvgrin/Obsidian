---
Type: Meta/Type/Metadata
Description: "Общее описание структуры заметок"
Version: "0.1"
Tags:
  - Meta/Metadata
  - Meta/Structure
  - Meta/Infrastructure
---
#Meta/Metadata #Meta/Structure #Meta/Infrastructure 
### Structure Notes
```dataview
table file.folder as Path, Description, Type, file.etags as Tags, Version
from #Meta/Structure  
```
