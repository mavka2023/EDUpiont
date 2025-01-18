import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Card, CardContent, IconButton, Select, MenuItem, CardHeader, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constants';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  type: 'text' | 'multipleChoice';
  question: string;
  options?: string[];
}
export interface Test {
  id?: string;
  name: string;
  questions: { id: number; type: 'text' | 'multipleChoice'; question: string; options?: string[] }[];
}


interface CreateTestProps {
  test?: Test;
  onSave?: (test: Test) => void;
}

const CreateTest: React.FC<CreateTestProps> = ({ test, onSave }) => {
  const [questions, setQuestions] = useState<Question[]>(test?.questions || []);
  const [questionId, setQuestionId] = useState<number>(questions.length + 1);
  const [testName, setTestName] = useState<string>(test?.name || '');
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState<boolean>(false);
  const [isNavigateDialogOpen, setIsNavigateDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (test) {
      setTestName(test.name);
      setQuestions(test.questions);
    }
  }, [test]);

  const hasUnsavedChanges = (testName || '') !== (test?.name || '') || questions.some(q => (q.question || '') !== (test?.questions.find(tq => tq.id === q.id)?.question || ''));

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
      if (onSave) onSave(newTest);
      setToast({ open: true, message: 'Test saved successfully!', severity: 'success' });
      setTimeout(() => navigate('/tests'), 1500);
      setIsSaveDialogOpen(false);
    } else {
      setToast({ open: true, message: 'Please fix the errors before saving.', severity: 'error' });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleNavigate = () => {
    setIsNavigateDialogOpen(false);
    navigate('/flashcards');
  };

  const handleSaveBeforeNavigate = () => {
    setIsNavigateDialogOpen(false);
    handleSubmit();
  };

  const handleCancelNavigation = () => {
    setIsNavigateDialogOpen(false);
  };

  const handleOpenSaveDialog = () => {
    setIsSaveDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setIsSaveDialogOpen(false);
  };

  return (
    <MainContent title={test ? 'Edit Test' : 'Create Test'} text="Create or edit your test by adding questions and options">
      <Box display="flex" flexDirection="column" gap={spacing.lg}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={spacing.md}>
              <TextField
                label="Test Name"
                color="secondary"
                fullWidth
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
        {questions.map((question) => (
          <Card key={question.id}>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" position="relative">
              <CardHeader title={`Question ${question.id}`} />
              <IconButton color="error" onClick={() => deleteQuestion(question.id)} style={{ position: 'absolute', right: spacing.sm }}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={spacing.sm}>
                <TextField
                  label="Question Text"
                  color="secondary"
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
                    <TextField
                      key={index}
                      label={`Option ${index + 1}`}
                      color="secondary"
                      fullWidth
                      value={option}
                      onChange={(e) => updateOption(question.id, index, e.target.value)}
                      error={!!errors[`${question.id}-${index}`]}
                      helperText={errors[`${question.id}-${index}`]}
                    />
                  ))}
                {question.type === 'multipleChoice' &&
                  question.options && (<Tooltip
                  title={
                    (question.options?.length || 0) >= 4
                      ? 'Only 4 options are allowed'
                      : ''
                  }
                >
                  <span>
                    <Button
                      color="secondary"
                      onClick={() => addOption(question.id)}
                      disabled={(question.options?.length || 0) >= 4}
                      size="small"
                    >
                      Add Option
                    </Button>
                  </span>
                </Tooltip>)}
              </Box>
            </CardContent>
          </Card>
        ))}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            '@media (max-width:768px)': {
              flexDirection: 'column',
              gap: spacing.md,
            },
          }}
        >

<Button
            variant="contained"
            color="primary"
            onClick={addQuestion}
            startIcon={<AddCircleIcon />}
          >
            Add Question
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            '@media (max-width:768px)': {
              flexDirection: 'column',
              gap: spacing.md,
            },
          }}
        >
            <Button
            color="secondary"
            onClick={hasUnsavedChanges ? () => setIsNavigateDialogOpen(true) : () => navigate('/flashcards')}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleOpenSaveDialog}
            disabled={!testName || questions.length === 0}
          >
            {test ? 'Save Changes' : 'Create Test'}
          </Button>
        </Box>
      </Box>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <Dialog open={isNavigateDialogOpen} onClose={handleCancelNavigation}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to leave without saving?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelNavigation} color="secondary">
            Stay
          </Button>
          <Button onClick={handleSaveBeforeNavigate} color="primary">
            Save and Leave
          </Button>
          <Button onClick={handleNavigate} color="error">
            Leave Without Saving
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isSaveDialogOpen} onClose={handleCloseSaveDialog}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MainContent>
  );
};

export default CreateTest;
