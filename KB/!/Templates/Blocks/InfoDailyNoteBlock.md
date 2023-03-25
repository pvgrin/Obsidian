---
Version: "0.1"
Description: "Блок информации об ежедевной заметке"
Topics:
  - Метаданные
  - Metadata
  - Info Daily Note Block
  - Template Block
  - Daily Note
---

#Meta/Metadata #Meta/Type/NoteBlock

## Журнал изменений

### "0.1" 13-03-2023
- В блок добавлен "**Metadata**" со ссылкой на заметку 

%% === NoteBlock Content === %%
>[!HINT]- Note Info
>**Type**:: #Meta/Type/DailyNote 
>**Metadata**:: [[Daily Note]] 
>Template: [[DailyNoteTemplate]]
>**Created**: `= [[Settings]].Templates.NoteHeader.CreatedDateFormatter` 
>**Modified**:  `= [[Settings]].Templates.NoteHeader.ModifiedDateFormatter` 
>**Path**:: "`= [[Settings]].Templates.NoteHeader.PathFormatter`"
>**Status**:: #Meta/Status/InProgress 
>**Description**: `= this.Description`
>**Aliases**: `= this.Aliases`
>**Topics**: `= this.Topics`