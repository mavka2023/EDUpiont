import React from 'react';
import  NoteForm  from './NoteForm'; 

const CreateNote: React.FC = () => {
  const handleSave = (note: { title: string; content: string }) => {
    console.log('Note saved:', note);
  };

  return <NoteForm onSave={handleSave} />;
};

export default CreateNote;
