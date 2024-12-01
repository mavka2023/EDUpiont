import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Tests = () => {
  const tests: ListItemProps[] = [
    {
      title: 'Test 1',
      link: '/tests/1',
    },
    {
      title: 'Test 2',
      link: '/tests/2',
    },
    {
      title: 'Test 3',
      link: '/tests/3',
    },    
    {
      title: 'Add new tests',
      icon: <AddIcon style={{ fontSize: 48 }} />,
      link: '/tests/create',
      hideMenu: true,
      hideModal: true,
    },
  ]

  return (
    <MainContent title="Tests" text="Here you can see and add your tests">
      <List items={tests}></List>
    </MainContent>
  );
};

export default Tests;
