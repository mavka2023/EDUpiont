import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, IconButton } from '@mui/material';
import styled from 'styled-components';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constants';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

// Mock data for the flashcards
interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

const mockFlashcards: Flashcard[] = [
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks like HTML.' },
    { id: 3, question: 'What is a component in React?', answer: 'A reusable UI element that can be a function or class.' },
];

const ViewFlashcardSet: React.FC = () => {
    const { flashcardsId } = useParams<{ flashcardsId: string }>();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [flipped, setFlipped] = useState<boolean>(false);

    useEffect(() => {
        setFlashcards(mockFlashcards);
    }, [flashcardsId]);

    if (flashcards.length === 0) return <></>;  // If no flashcards, return empty fragment

    const nextFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const prevFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const currentFlashcard = flashcards[currentIndex];

    return (
        <MainContent title={`View Flashcard Set #${flashcardsId}`}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={spacing.lg}>
                <FlashcardContainer>
                    <FlashcardCard flipped={flipped} onClick={() => setFlipped((prevState) => !prevState)}>
                        <FlashcardSide front>
                            <FlashcardText variant="h2">
                                {currentFlashcard.question}
                            </FlashcardText>
                        </FlashcardSide>
                        <FlashcardSide>
                            <FlashcardText variant="h2">
                                {currentFlashcard.answer}
                            </FlashcardText>
                        </FlashcardSide>
                    </FlashcardCard>
                </FlashcardContainer>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={spacing.md}>
                    <IconButton onClick={prevFlashcard} disabled={flashcards.length <= 1}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="body1">
                        {currentIndex + 1} of {flashcards.length}
                    </Typography>
                    <IconButton onClick={nextFlashcard} disabled={flashcards.length <= 1}>
                        <ArrowForward />
                    </IconButton>
                </Box>
            </Box>
        </MainContent>
    );
};

const FlashcardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    perspective: 1000px;
    margin-bottom: ${spacing.lg};
`;

const FlashcardCard = styled.div<{flipped: boolean}>`
    width: 500px;
    height: 300px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    display: flex;
    flex-direction: row;
    position: relative;

    ${(props) => props.flipped && 'transform: rotateY(180deg);'}
`;

const FlashcardSide = styled(Card)<{ front?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    transform: ${(props) => (props.front ? 'rotateY(0deg)' : 'rotateY(180deg)')};
`;

const FlashcardText = styled(Typography)`
    padding: ${spacing.md};
    text-align: center;
`;

export default ViewFlashcardSet;
