---
Type: Meta/Type/SimpleNote
Description: Note Example
Metadata: "[[Simple Note]]"
Template:
  Name: SimpleNoteTemplate
  Version: "0.1"
Aliases:
  - 
Topics:
  - 
Tags:
  - Meta/ToHygiene
---
>[!HINT]- Note Info
>**Created**: `= [[Settings]].Templates.NoteHeader.CreatedDateFormatter` 
>**Modified**:  `= [[Settings]].Templates.NoteHeader.ModifiedDateFormatter` 
>**Path**: "`= [[Settings]].Templates.NoteHeader.PathFormatter`"
>> [!TODO]- Note's Tasks
>> ```tasks
>>path includes {{query.file.path}}
>>not done
>>short mode
# `=[[Settings]].Templates.NoteTitleFormatter` 

>[!warning]- Что нужно сделать с новой заметкой
>- [ ] Поправить метаданные в frontmatter: добавить описание и топики
>- [ ] Добавить новые теги
>- [ ] Удалить этот раздел
>- [ ] Удалить тег Meta/ToHygiene

%% === Note Content === %%
%% === Note Footer === %%
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
> ```
> ```dataview
> LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "") + " {"+rows[0].topics+"}"
> FROM [[]] AND !#Meta/Metadata AND !#Meta/Infrastructure AND !#Meta/Hidden
> FLATTEN file.mtime as mtime
> GROUP BY mtime
> SORT  mtime DESC
> LIMIT 10 
> ```