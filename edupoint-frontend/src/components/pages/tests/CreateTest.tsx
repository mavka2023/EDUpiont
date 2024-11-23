import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, IconButton, Select, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MainContent from '../../mainContent/MainContent';

interface Question {
    id: number;
    type: 'text' | 'multipleChoice';
    question: string;
    options?: string[];
}

const CreateTest: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [testName, setTestName] = useState<string>('');

    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { id: prev.length + 1, type: 'text', question: '', options: [''] },
        ]);
    };

    const updateQuestion = (id: number, field: keyof Question, value: any) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === id
                    ? {
                          ...q,
                          [field]: value,
                          ...(field === 'type' && value === 'text' ? { options: undefined } : {}),
                      }
                    : q
            )
        );
    };

    const updateOption = (id: number, index: number, value: string) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === id && q.options
                    ? {
                          ...q,
                          options: q.options.map((opt, i) => (i === index ? value : opt)),
                      }
                    : q
            )
        );
    };

    const addOption = (id: number) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === id && q.options ? { ...q, options: [...q.options, ''] } : q
            )
        );
    };

    const deleteQuestion = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const handleSubmit = () => {
        console.log({ testName, questions });
        alert('Test created successfully!');
    };

    return (
        <MainContent title="Create Test">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                <TextField
                    label="Test Name"
                    variant="outlined"
                    fullWidth
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                />

                {questions.map((question) => (
                    <Card key={question.id} sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Question {question.id}</Typography>
                                <IconButton color="error" onClick={() => deleteQuestion(question.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <TextField
                                label="Question Text"
                                variant="outlined"
                                fullWidth
                                value={question.question}
                                onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Select
                                value={question.type}
                                onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                            </Select>
                            {question.type === 'multipleChoice' &&
                                question.options &&
                                question.options.map((option, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <TextField
                                            label={`Option ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            value={option}
                                            onChange={(e) => updateOption(question.id, index, e.target.value)}
                                        />
                                    </Box>
                                ))}
                            {question.type === 'multipleChoice' && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => addOption(question.id)}
                                    sx={{ mt: 1 }}
                                >
                                    Add Option
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addQuestion}
                        startIcon={<AddCircleIcon />}
                    >
                        Add Question
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                        disabled={!testName || questions.length === 0}
                    >
                        Create Test
                    </Button>
                </Box>
            </Box>
        </MainContent>
    );
};

export default CreateTest;
