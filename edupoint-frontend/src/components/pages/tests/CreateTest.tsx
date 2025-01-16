import React from 'react';
import TestForm, { Test } from './TestForm';
import { useNavigate } from 'react-router-dom';

const CreateTest: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (test: Test) => {
    const storedTests = localStorage.getItem('tests');
    const tests = storedTests ? JSON.parse(storedTests) : [];

    const newTestId = Math.random().toString(36).substr(2, 9);
    const newTest = { ...test, id: newTestId };
    const updatedTests = [...tests, newTest];

    localStorage.setItem('tests', JSON.stringify(updatedTests));
    navigate('/tests');
  };

  return <TestForm onSave={handleSave} />;
};

export default CreateTest;
