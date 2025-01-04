---
Type: Meta/Type/Metadata
Description: "Реестр блоков заметок"
Version: "0.1"
Tags:
  - Meta/Structure
  - Meta/Metadata
  - Meta/Infrastructure
---
### Note Blocks
```dataview
table Description, Type, file.etags as Tags, Version, Meta
from #Meta/Type/NoteBlock   
```
