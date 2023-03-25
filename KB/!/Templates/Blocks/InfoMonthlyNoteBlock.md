---
Version: "0.1"
Description: "Блок информации об ежемесячной заметки"
Topics:
  - Метаданные
  - Metadata
  - Info Monthly Note Block
  - Template Block
  - Monthly Note
---

#Meta/Metadata #Meta/Type/NoteBlock

## Журнал изменений

### "0.1" 13-03-2023
- Начальная версия 

%% === NoteBlock Content === %%
>[!HINT]- Note Info
>**Type**:: #Meta/Type/MonthlyNote 
>**Metadata**:: [[Monthly Note]] 
>Template: [[MonthlyNoteTemplate]]
>**Created**: `= [[Settings]].Templates.NoteHeader.CreatedDateFormatter` 
>**Modified**:  `= [[Settings]].Templates.NoteHeader.ModifiedDateFormatter` 
>**Path**:: "`= [[Settings]].Templates.NoteHeader.PathFormatter`"
>**Status**:: #Meta/Status/InProgress 
>**Description**: `= this.Description`
>**Aliases**: `= this.Aliases`
>**Topics**: `= this.Topics`