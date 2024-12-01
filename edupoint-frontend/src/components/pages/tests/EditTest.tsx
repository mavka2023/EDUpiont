import React from 'react';
import { Test } from './CreateTest';
import TestForm from './TestForm';

const existingTest = {
  id: 1,
  name: 'Sample Test',
  questions: [
    { id: 1, type: 'text' as const, question: 'What is React?', options: [] },
    { id: 2, type: 'multipleChoice' as const, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin'] },
  ],
};

const EditTest: React.FC = () => {
  const handleSave = (test: Test) => {
    console.log('Test saved:', test);
  };

  return <TestForm test={existingTest} onSave={handleSave} />;
};

export default EditTest;