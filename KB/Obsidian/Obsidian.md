---
Type: Meta/Type/ProjectNote
Description: Obsidian
Metadata: "[[Project Note]]"
Template:
  Name: ProjectNoteTemplate
  Version: "0.3"
Aliases:
  - 
Topics:
  - Obsidian
Tags:
  - Meta/Project
  - Meta/ToHygiene
Status: Meta/Status/InProgress
---
>[!HINT]- Project Info
>**Created**: `= [[Settings]].Templates.NoteHeader.CreatedDateFormatter` 
>**Modified**:  `= [[Settings]].Templates.NoteHeader.ModifiedDateFormatter` 
>**Path**: "`= [[Settings]].Templates.NoteHeader.PathFormatter`"
# `=[[Settings]].Templates.NoteTitleFormatter` 

%% === Note Content === %%
# О...
Проект доработок базы знаний. 
# Активности
> [!TODO]+ "`=[[Settings]].Templates.NoteTitleFormatter`" Active Tasks
> ```tasks
> description includes [[{{query.file.filenameWithoutExtension}}]]:
> group by filename reverse
> not done
> short mode
> ```

> [!example]- "`=[[Settings]].Templates.NoteTitleFormatter`" Closed Tasks
> ```tasks
> description includes [[{{query.file.filenameWithoutExtension}}]]:
> group by filename reverse
> done
> short mode
> ```

>[!hint]- Прочее
> ```dataview
> LIST WITHOUT ID rows[0].file.link  + choice(rows[0].Description, ": " + rows[0].Description, "") + " {"+rows[0].topics+"}"
> FROM [[]] AND !#Meta/Metadata AND !#Meta/Infrastructure AND !#Meta/Hidden
> FLATTEN file.mtime as mtime
> GROUP BY mtime
> SORT  mtime DESC
> LIMIT 100 
> ```

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