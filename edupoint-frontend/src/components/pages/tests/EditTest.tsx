import React from 'react';
import { useNavigate } from 'react-router-dom';
import TestForm from './TestForm';
import { Test } from './TestForm';

const EditTest: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (updatedTest: Test) => {
    const storedTests = localStorage.getItem('tests');
    const tests = storedTests ? JSON.parse(storedTests) : [];

    const testIndex = tests.findIndex((test: { id: string }) => test.id === updatedTest.id);

    if (testIndex !== -1) {
      tests[testIndex] = updatedTest;
      localStorage.setItem('tests', JSON.stringify(tests));
    }

    navigate('/tests');
  };

  const existingTest = (() => {
    const storedTests = localStorage.getItem('tests');
    const tests = storedTests ? JSON.parse(storedTests) : [];
    const testId = window.location.pathname.split('/').pop(); // Extracts the test ID from the URL.
    return tests.find((test: { id: string }) => test.id === testId);
  })();

  if (!existingTest) {
    return <div>Test not found</div>;
  }

  return <TestForm test={existingTest} onSave={handleSave} />;
};

export default EditTest;
