#Meta/Metadata #Meta/Type/NoteBlock

%% === NoteBlock Content === %%
>[!info]- Близкие заметки 
> ```dataview
> LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "")
> FROM ("") AND !#Meta/Metadata AND !#Meta/Infrastructure AND !#Meta/Hidden
> FLATTEN topics as flattenedTopics
> FLATTEN tags as flattenedTags
> WHERE (contains(this.topics, flattenedTopics) OR contains(this.tags, flattenedTags))  AND (file.name != this.file.name)
> FLATTEN file.mtime as mtime
> GROUP BY mtime
> SORT  mtime DESC
> LIMIT 10 
> ```
> ```dataview
> LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "")
> FROM [[]] AND !#Meta/Metadata AND !#Meta/Infrastructure AND !#Meta/Hidden
> FLATTEN file.mtime as mtime
> GROUP BY mtime
> SORT  mtime DESC
> LIMIT 10 
> ```
