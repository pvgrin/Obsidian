---
Version: "0.3"
Description: "Шаблон заметки проекта"
Topics:
  - Метаданные
  - Project Note Template
  - Template
---
#Meta/Type/Template #Meta/Metadata #Meta/Infrastructure

%% === Template Content === %%
{{InfoProjectNoteBlock}}
{{TitleNoteBlock}} 

%% === Note Content === %%
# О...
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
{{SimilarProjectNotesNoteBlock}}
