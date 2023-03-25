---
   Description: "Обрабатывает все блоки формата {{BlockName}} в текущей заметке, подставляя контент из !\Templates\Blocks\<BlockName>"  
---
#Meta/Metadata
```
<%*
	await tp.user.ApplyTemplate(tp, tR, false);
	return "";
%>