import React from 'react';
import FlashcardsForm from './FlashcardsForm';
import { useNavigate } from 'react-router-dom';

const CreateFlashcards: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (flashcardSet: { name: string; flashcards: { question: string; answer: string }[] }) => {
    const storedFlashcards = localStorage.getItem('flashcards');
    const flashcards = storedFlashcards ? JSON.parse(storedFlashcards) : [];

    const newFlashcardSetId = Math.random().toString(36).substr(2, 9);
    const newFlashcardSet = { ...flashcardSet, id: newFlashcardSetId };
    const updatedFlashcards = [...flashcards, newFlashcardSet];

    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    navigate('/flashcards');
  };

  return <FlashcardsForm onSave={handleSave} />;
};

export default CreateFlashcards;
