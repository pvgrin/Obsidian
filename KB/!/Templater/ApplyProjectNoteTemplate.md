---
   Description: "The script applies to the current note the template 'ProjectNoteTemplate': at first, it inserts into begin of active note new frontmatter 'ProjectNoteFrontmatter', and at second applies the new template"
---
#Meta/Metadata #Meta/Infrastructure

```
<%*
	// Insert into begin of active note new frontmatter 'ProjectNoteFrontmatter'
	await tp.user.InsertNote(tp, tR, "!/Templates/ProjectNoteFrontmatter.md", 0);
	// Apply current note blocks
	await tp.user.ApplyTemplate(tp, tR, false);
	
	// Update frontmatter cache
    await app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
        // console.log(">>frontmatter:\n", frontmatter);
    });
    
	// Apply the new frontmatter template and template blocks
	await tp.user.ApplyTemplate(tp, tR);
	
	// return empty text
	return;
%>

