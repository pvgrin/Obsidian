---
Type: Meta/Type/NoteBlock
Description: "Блок информации об ежегодной заметке"
Metadata: "[[Note Block]]"
Version: "0.1"
Topics:
  - Метаданные
  - Metadata
  - Info Yearly Note Block
  - Template Block
  - Yearly Note
---
#Meta/Metadata #Meta/Infrastructure
## Журнал изменений

### "0.1" 20-03-2023
- Начальная версия 

%% === NoteBlock Content === %%
>[!HINT]- Note Info
>**Type**:: #Meta/Type/YearlyNote 
>Template: [[YearlyNoteTemplate]]
>**Created**: `= [[Settings]].Templates.NoteHeader.CreatedDateFormatter` 
>**Modified**:  `= [[Settings]].Templates.NoteHeader.ModifiedDateFormatter` 
>**Path**:: "`= [[Settings]].Templates.NoteHeader.PathFormatter`"
>**Status**:: #Meta/Status/InProgress 
>**Description**: `= this.Description`
>**Aliases**: `= this.Aliases`
>**Topics**: `= this.Topics`