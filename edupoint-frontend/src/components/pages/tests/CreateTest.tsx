import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, IconButton, Select, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constans';

interface Question {
  id: number;
  type: 'text' | 'multipleChoice';
  question: string;
  options?: string[];
}

export interface Test {
  id?: number;
  name: string;
  questions: Question[];
}

interface CreateTestProps {
  test?: Test;
  onSave: (test: Test) => void;
}

const CreateTest: React.FC<CreateTestProps> = ({ test, onSave }) => {
  const [questions, setQuestions] = useState<Question[]>(test?.questions || []);
  const [questionId, setQuestionId] = useState<number>(questions.length + 1);
  const [testName, setTestName] = useState<string>(test?.name || '');
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (test) {
      setTestName(test.name);
      setQuestions(test.questions);
    }
  }, [test]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: questionId, type: 'text', question: '', options: [''] },
    ]);
    setQuestionId((prev) => prev + 1);
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
        q.id === id && q.options && q.options.length < 4
          ? { ...q, options: [...q.options, ''] }
          : q
      )
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const validateInputs = () => {
    const newErrors: { [key: number]: string } = {};
    questions.forEach((question) => {
      if (question.question.length < 10) {
        newErrors[question.id] = 'Question must be at least 10 characters long';
      }
      if (question.type === 'multipleChoice' && question.options) {
        question.options.forEach((option, index) => {
          if (option.trim() === '') {
            newErrors[`${question.id}-${index}`] = 'Option cannot be empty';
          }
        });
        
        if (question.options.length < 2) {
            newErrors[question.id] = 'Question must have at least 2 options';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const newTest: Test = { id: test?.id, name: testName, questions };
      onSave(newTest);
      alert('Test saved successfully!');
    }
  };

  return (
    <MainContent title={test ? "Edit Test" : "Create Test"} text="Create or edit your test by adding questions and options">
      <Box display={"flex"} flexDirection={"column"} gap={spacing.lg}>
        <TextField
          label="Test Name"
          variant="outlined"
          fullWidth
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />

        {questions.map((question) => (
          <Card key={question.id}>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={spacing.md}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
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
                  error={!!errors[question.id]}
                  helperText={errors[question.id]}
                />
                <Select
                  value={question.type}
                  onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                  fullWidth
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                </Select>
                {question.type === 'multipleChoice' &&
                  question.options &&
                  question.options.map((option, index) => (
                    <Box key={index}>
                      <TextField
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        value={option}
                        onChange={(e) => updateOption(question.id, index, e.target.value)}
                        error={!!errors[`${question.id}-${index}`]}
                        helperText={errors[`${question.id}-${index}`]}
                      />
                    </Box>
                  ))}
                {question.type === 'multipleChoice' && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => addOption(question.id)}
                    disabled={(question.options?.length || 0) >= 4}
                  >
                    Add Option
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
        <Box display="flex" justifyContent="space-between">
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
            {test ? "Save Changes" : "Create Test"}
          </Button>
        </Box>
      </Box>
    </MainContent>
  );
};

export default CreateTest;