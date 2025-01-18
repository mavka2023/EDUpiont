import React from 'react';
import FlashcardsForm from './FlashcardsForm';
import { useNavigate, useParams } from 'react-router-dom';

const EditFlashcards: React.FC = () => {
  const navigate = useNavigate();
  const { flashcardSetId } = useParams<{ flashcardSetId: string }>();

  const handleSave = (updatedFlashcardSet: { id?: number; name: string; flashcards: { question: string; answer: string }[] }) => {
    const storedFlashcards = localStorage.getItem('flashcards');
    const flashcards = storedFlashcards ? JSON.parse(storedFlashcards) : [];

    const setIndex = flashcards.findIndex((set: { id: number }) => set.id.toString() === flashcardSetId);

    if (setIndex !== -1) {
      flashcards[setIndex] = { ...updatedFlashcardSet, id: flashcards[setIndex].id };
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
  };

  const existingFlashcardSet = (() => {
    const storedFlashcards = localStorage.getItem('flashcards');
    const flashcards = storedFlashcards ? JSON.parse(storedFlashcards) : [];
    return flashcards.find((set: { id: number }) => set.id.toString() === flashcardSetId);
  })();

  return <FlashcardsForm flashcardSet={existingFlashcardSet} onSave={handleSave} />;
};

export default EditFlashcards;
