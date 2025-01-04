---
Type: Meta/Type/NoteBlock
Version: "0.3"
Description: Блок информации об ежедевной заметке
Meta: "[[Note Block]]"
Tags:
  - Meta/Metadata
Topics:
  - Метаданные
  - Metadata
  - Info Daily Note Block
  - Note Block
  - Daily Note Template
---
#Meta/Metadata #Meta/Type/NoteBlock #Meta/Infrastructure
## Журнал изменений

### "0.3" 04-02-2024
- Добавлен блок задач 
### "0.2" 13-03-2023
- Основное содержимое перенесено в блок Frontmatter 
### "0.1" 13-03-2023
- В блок добавлен "**Metadata**" со ссылкой на заметку 

%% === NoteBlock Content === %%
>[!HINT]- Note Info
>**Created**: `= [[Settings]].Templates.NoteHeader.CreatedDateFormatter` 
>**Modified**:  `= [[Settings]].Templates.NoteHeader.ModifiedDateFormatter` 
>**Path**: "`= [[Settings]].Templates.NoteHeader.PathFormatter`"
>> [!TODO]- Note's Tasks
>> ```tasks
>>path includes {{query.file.path}}
>>not done
>>short mode
