#Meta/Metadata #Meta/Type/NoteBlock

%% === NoteBlock Content === %%
>[!info]- Близкие заметки 
> %% Поиск по топикам %%
> ```dataview
>LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "")
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
> %% Все заметки, которые ссылаются на текущую (`[[]]` lets you query from all files linking to the current file.)  %%
> ```dataview
> LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "")
> FROM [[]] AND !#Meta/Metadata AND !#Meta/Infrastructure AND !#Meta/Hidden
> FLATTEN file.mtime as mtime
> GROUP BY mtime
> SORT  mtime DESC
> LIMIT 10 
> ```
