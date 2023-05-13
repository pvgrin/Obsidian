Tags: #Meta/Infrastructure #Meta/OutdatedTemplate  

```dataview
TABLE WITHOUT ID styleStart + file.link + styleEnd AS "Note", Description, file.ctime as "Created", file.mtime as "Modified" 
FROM "Daily Notes"
WHERE typeof(date(file.name)) = "date"
SORT file.mtime DESC
LIMIT [[Settings]].DailyRecent.Length
FLATTEN [[Settings]].DailyRecent.NoteSpan.Start AS styleStart
FLATTEN [[Settings]].DailyRecent.NoteSpan.End AS styleEnd
```

```dataview
CALENDAR file.mtime 
FROM "Daily Notes"
WHERE typeof(date(file.name)) = "date"
SORT file.mtime DESC
LIMIT [[Settings]].DailyRecent.Length
```
