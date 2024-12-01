import React from 'react';
import FlashcardsForm from './FlashcardsForm';

const CreateFlashcards: React.FC = () => {
  const handleSave = (flashcardSet: { name: string; flashcards: { question: string; answer: string }[] }) => {
    console.log('Flashcard set saved:', flashcardSet);
  };

  return <FlashcardsForm onSave={handleSave} />;
};

export default CreateFlashcards;
