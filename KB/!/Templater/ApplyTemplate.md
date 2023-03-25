---
   Description: "Применяет шаблон, указанный во Frontmatter к текущей заметке. Шаблоны ищется по имени в папке !\Templates"
---
#Meta/Metadata
```
<%*
	// first - apply the frontmatter template and template blocks
	await tp.user.ApplyTemplate(tp, tR);
	// second - apply current note blocks
	await tp.user.ApplyTemplate(tp, tR, false);
	
	return "";
%>