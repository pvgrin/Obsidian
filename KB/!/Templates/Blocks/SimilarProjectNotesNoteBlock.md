---
Version: "0.1"
Description: "Блок выбора заметок, содержащих аналогичные топики"
Topics:
  - Метаданные
  - Template Block
---

#Meta/Metadata #Meta/Type/NoteBlock #Meta/Infrastructure
## Журнал изменений

### "0.1" 18-07-2024
- Блок создан копированием из [[SimilarNotesNoteBlock]]. Удален блок формирующий список заметок по ссылкам на текущую, тк эти ссылки используются в блоке "Активности" проекта.

%% === NoteBlock Content === %%
>[!info]- Близкие заметки 
> ```dataview
>LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "") + " {"+rows[0].topics+"}"
>FROM ("") AND !#Meta/Metadata AND !#Meta/Infrastructure AND !#Meta/Hidden
>FLATTEN topics as flattenedTopics
>FLATTEN tags as flattenedTags
>WHERE (this.topics != null) AND (flattenedTopics != null) AND contains(this.topics, flattenedTopics) 
>	AND (file.name != this.file.name)
>FLATTEN file.mtime as mtime
>GROUP BY mtime
>SORT  mtime DESC
>LIMIT 10 

