import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardHeader } from '@mui/material';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constants';

interface Question {
    id: number;
    type: 'text' | 'multipleChoice';
    question: string;
    options?: string[];
}

const questions: Question[] = [
    { id: 1, type: 'text', question: 'What is your name?' },
    { id: 2, type: 'multipleChoice', question: 'What is the capital of France?', options: ['A. Berlin', 'B. Madrid', 'C. Paris', 'D. Rome'] },
];

const SolveTest: React.FC = () => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [openModal, setOpenModal] = useState(false);
    const [openScoreModal, setOpenScoreModal] = useState(false);

    const { testId } = useParams<{ testId: string }>();

    const handleInputChange = (id: number, value: string) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleConfirmClick = () => {
        setOpenModal(false);
        setOpenScoreModal(true);
    };

    const handleScoreModalClose = () => {
        setOpenScoreModal(false);
    };

    return (
        <MainContent title={`Solve Test #${testId}`}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={spacing.lg}>
                {questions.map((question) => (
                    <Card key={question.id}>
                        <CardHeader title={`Question ${question.question}`} />
                        <CardContent>
                            {question.type === 'text' ? (
                                <TextField
                                    fullWidth
                                    value={answers[question.id] || ''}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                />
                            ) : (
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    >
                                        {question.options?.map((option, index) => (
                                            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        </CardContent>
                    </Card>
                ))}
                <Button variant="contained" color="primary" onClick={handleModalOpen} >
                    Submit Test
                </Button>
            </Box>
            <Dialog
                open={openModal}
                onClose={handleModalClose}
            >
                <DialogTitle>Confirm Test Submission</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to submit the test?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmClick} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openScoreModal}
                onClose={handleScoreModalClose}
            >
                <DialogTitle>Test Score</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your score is 57%.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleScoreModalClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </MainContent>
    );
};

export default SolveTest;