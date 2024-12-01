import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, IconButton, Select, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constans';
import TestForm from './TestForm';

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

const CreateTest = () => {

  const onSave = (test: Test) => {
    console.log('Test saved:', test);
  }

  
  return <TestForm onSave={onSave} />;
};

export default CreateTest;