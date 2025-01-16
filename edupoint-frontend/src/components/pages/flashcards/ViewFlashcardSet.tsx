import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, IconButton } from '@mui/material';
import styled from 'styled-components';
import MainContent from '../../mainContent/MainContent';
import { colors, fontSize, spacing } from '../../../styles/constants';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

const ViewFlashcardSet: React.FC = () => {
    const { flashcardsId } = useParams<{ flashcardsId: string }>();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [flipped, setFlipped] = useState<boolean>(false);

    useEffect(() => {
        const storedFlashcards = localStorage.getItem('flashcards');
        const allFlashcardSets = storedFlashcards ? JSON.parse(storedFlashcards) : [];
        const flashcardSet = allFlashcardSets.find((set: { id: string }) => set.id === flashcardsId);

        setFlashcards(flashcardSet ? flashcardSet.flashcards : []);
    }, [flashcardsId]);

    if (flashcards.length === 0) return <></>; 

    const nextFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const prevFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const currentFlashcard = flashcards[currentIndex];

    if (flashcards.length === 0) {
        return (
          <MainContent title="Note Not Found">
            <p style={{ color: colors['font-header'], fontSize: fontSize.md }}>
            The flashcards you are looking for do not exist.
            </p>
          </MainContent>
        );
      }

    return (
        <MainContent title={`View Flashcard Set #${flashcardsId}`}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={spacing.lg}>
                <FlashcardContainer>
                    <FlashcardCard flipped={flipped} onClick={() => setFlipped((prevState) => !prevState)}>
                        <FlashcardSide front>
                            <FlashcardText variant="h2">
                                {currentFlashcard.question}
                            </FlashcardText>
                            <FlashcardFlipText variant="h4">Click on the flashcard to flip 👆</FlashcardFlipText>
                        </FlashcardSide>
                        <FlashcardSide>
                            <FlashcardText variant="h2">
                                {currentFlashcard.answer}
                            </FlashcardText>
                            <FlashcardFlipText variant="h4">Click on the flashcard to flip 👆</FlashcardFlipText>
                        </FlashcardSide>
                    </FlashcardCard>
                </FlashcardContainer>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={spacing.md}>
                    <StyledIconButton onClick={prevFlashcard} disabled={flashcards.length <= 1}>
                        <ArrowBack />
                    </StyledIconButton>
                    <Typography variant="h4">
                        {currentIndex + 1} / {flashcards.length}
                    </Typography>
                    <StyledIconButton onClick={nextFlashcard} disabled={flashcards.length <= 1}>
                        <ArrowForward />
                    </StyledIconButton>
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
    width: 700px;
    height: 400px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    display: flex;
    flex-direction: row;
    position: relative;
    background: ${colors['gray-lt']};

    ${(props) => props.flipped && 'transform: rotateY(180deg);'}

    @media (max-width: 1000px) {
        width: 450px;
        height: 325px;
    }

    @media (max-width: 768px) {
        width: 350px;
        height: 300px;
    }

    @media (max-width: 450px) {
        width: 275px;
        height: 250px;
    }
`;

const FlashcardSide = styled(Card)<{ front?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    transform: ${(props) => (props.front ? 'rotateY(0deg)' : 'rotateY(180deg)')};
`;

const FlashcardText = styled(Typography)`
    padding: ${spacing.md};
    padding-top: 0;
    text-align: center;
`;

const FlashcardFlipText = styled(Typography)`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: ${spacing.sm};
    background: ${colors['gray']};
    border-top: 2px solid ${colors['gray-dk']};
`

const StyledIconButton = styled(IconButton)`
    padding: ${spacing.xs}!important;
    border: 2px solid ${colors['gray-dk']}!important;
    background: ${colors.white}!important;
`;


export default ViewFlashcardSet;
