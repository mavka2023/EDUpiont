import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardHeader } from '@mui/material';
import MainContent from '../../mainContent/MainContent';
import { colors, fontSize, spacing } from '../../../styles/constants';

interface Question {
    id: number;
    type: 'text' | 'multipleChoice';
    question: string;
    options?: string[];
}

const SolveTest: React.FC = () => {
    const { testId } = useParams<{ testId: string }>();
    const [test, setTest] = useState<{ id: string, name: string, questions: Question[] } | null>(null);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [openModal, setOpenModal] = useState(false);
    const [openScoreModal, setOpenScoreModal] = useState(false);

    useEffect(() => {
        const storedTests = localStorage.getItem('tests');
        const tests = storedTests ? JSON.parse(storedTests) : [];

        const test = tests.find((test: { id: string }) => test.id === testId);
        setTest(test || null);
    }, [testId]);

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

    if (!test) {
        return (
          <MainContent title="Note Not Found">
            <p style={{ color: colors['font-header'], fontSize: fontSize.md }}>
              The test you are looking for does not exist.
            </p>
          </MainContent>
        );
      }

    return (
        <MainContent title={`Solve Test #${testId}`}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={spacing.lg}>
                {test.questions.map((question) => (
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
                    <Button onClick={handleModalClose} color="secondary">
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
                <DialogTitle>You finished</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your answers have been submitted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleScoreModalClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </MainContent>
    );
};

export default SolveTest;
