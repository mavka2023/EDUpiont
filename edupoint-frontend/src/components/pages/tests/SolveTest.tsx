import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, Card, CardContent, Typography } from '@mui/material';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constans';

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

    const { testId } = useParams<{ testId: string }>();

    const handleInputChange = (id: number, value: string) => {
        setAnswers({ ...answers, [id]: value });
    };

    return (
        <MainContent title={`Solve Test #${testId}`}>
            <Box display={"flex"} flexDirection={"column"} gap={spacing.lg}>
                {questions.map((question) => (
                    <Card key={question.id}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {question.question}
                            </Typography>
                            <FormControl component="fieldset" fullWidth>
                                {question.type === 'text' ? (
                                    <TextField
                                        variant="outlined"
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                                        fullWidth
                                        placeholder="Type your answer here"
                                    />
                                ) : (
                                    <RadioGroup
                                        name={`question-${question.id}`}
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    >
                                        {question.options?.map((option, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={option}
                                                control={<Radio />}
                                                label={option}
                                            />
                                        ))}
                                    </RadioGroup>
                                )}
                            </FormControl>
                        </CardContent>
                    </Card>
                ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log(answers)}
                    >
                        Submit
                    </Button>
            </Box>
        </MainContent>
    );
};

export default SolveTest;
