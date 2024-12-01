import React from 'react';
import FlashcardsForm from './FlashcardsForm';

const existingFlashcardSet = {
  id: 1,
  name: 'Sample Flashcard Set',
  flashcards: [
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks like HTML' },
  ],
};

const EditFlashcards: React.FC = () => {
  const handleSave = (flashcardSet: { name: string; flashcards: { question: string; answer: string }[] }) => {
    console.log('Flashcard set saved:', flashcardSet);
  };

  return <FlashcardsForm flashcardSet={existingFlashcardSet} onSave={handleSave} />;
};

export default EditFlashcards;
