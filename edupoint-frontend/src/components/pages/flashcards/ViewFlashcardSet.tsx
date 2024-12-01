import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constants';

interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

const mockFlashcards: Flashcard[] = [
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks like HTML.' },
    { id: 3, question: 'What is a component in React?', answer: 'A reusable UI element that can be a function or class.' }
];

const ViewFlashcardSet: React.FC = () => {
    const { flashcardsId } = useParams<{ flashcardsId: string }>();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    useEffect(() => {
        setFlashcards(mockFlashcards);
    }, [flashcardsId]);

    return (
        <MainContent title={`View Flashcard Set #${flashcardsId}`}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                {flashcards.map((flashcard) => (
                    <Card key={flashcard.id} style={{ marginBottom: spacing.lg }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Question {flashcard.id}: {flashcard.question}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Answer:</strong> {flashcard.answer}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </MainContent>
    );
};

export default ViewFlashcardSet;
