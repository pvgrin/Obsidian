---
Version: "0.2"
Description: "Шаблон ежемесячной заметки"
Topics:
  - Метаданные
  - Monthly Note Template
  - Template
  - Monthly Note
---
#Meta/Type/Template #Meta/Metadata #Meta/Infrastructure

## Журнал изменений

### "0.1" 12-03-2023
- Начальный вариант шаблона

%% === Template Content === %%
{{InfoMonthlyNoteBlock}}

{{HeaderLinksMonthlyNoteBlock}}

%% === Note Content === %%
## Задачи
>[!todo] Сделать:
>```tasks
>path regex matches /Daily Notes\/Days\/{{Title}}/
>heading does not include Регулярные задачи
>not done
>short mode
>group by filename
>```

%% === Note Footer === %%
{{SimilarNotesNoteBlock}}

{{FooterLinksDailyNoteBlock}}