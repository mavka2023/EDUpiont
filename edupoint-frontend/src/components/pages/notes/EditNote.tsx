import React from 'react';
import  NoteForm from './NoteForm';

const existingNote = {
  id: 1,
  title: 'Sample Note',
  content: `# Mocked Note

This is a mocked Markdown note for demonstration purposes.

## Section 1
- Item 1
- Item 2

## Section 2
> "This is a blockquote in the note."

## Conclusion
Markdown makes notes look structured and easy to read.
`,
};

const EditNote: React.FC = () => {
  const handleSave = (note: { title: string; content: string }) => {
    console.log('Note saved:', note);
  };

  return <NoteForm note={existingNote} onSave={handleSave} />;
};

export default EditNote;
