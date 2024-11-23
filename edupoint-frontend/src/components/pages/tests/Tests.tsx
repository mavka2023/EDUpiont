import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Tests = () => {
  const tests: ListItemProps[] = [
    {
      title: 'Test 1',
      text: 'Test 1 description',
      link: '/test1',
    },
    {
      title: 'Test 2',
      text: 'Test 2 description',
      link: '/test2',
    },
    {
      title: 'Test 3',
      text: 'Test 3 description',
      link: '/test3',
    },    
    {
      title: 'Add new tests',
      text: 'Test 3 description',
      icon: <AddIcon style={{ fontSize: 48 }} />,
      onClick: () => {
        console.log('Add new test');
      },
    },
  ]

  return (
    <MainContent title="Tests" text="Here you can see and add your tests">
      <List items={tests}></List>
    </MainContent>
  );
};

export default Tests;
