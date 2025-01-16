import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Tests = () => {
  const storedTests = localStorage.getItem('tests');
  const testsFromStorage = storedTests ? JSON.parse(storedTests) : [];

  const tests: ListItemProps[] = testsFromStorage.map(
    (test: { id: number; name: string }) => ({
      title: test.name,
      link: `/tests/${test.id}`,
      onDelete: () => handleDelete(test.id.toString()),
      showModal: true,
      modalText: 'Are you sure you want to start this test?',
      confrimationModalTitle: 'Start test',
      modalButtonText: 'Start',
    })
  );

  tests.push({
    title: 'Add new tests',
    icon: <AddIcon style={{ fontSize: 48 }} />,
    link: '/tests/create',
    hideMenu: true,
    showModal: false,
  });

  const handleDelete = (id: string) => {
    const storedTests = localStorage.getItem('tests');
    const tests = storedTests ? JSON.parse(storedTests) : [];

    const updatedTests = tests.filter((test: { id: string }) => test.id !== id);
    localStorage.setItem('tests', JSON.stringify(updatedTests));
  };

  return (
    <MainContent title="Tests" text="Here you can see and add your tests">
      <List items={tests}></List>
    </MainContent>
  );
};

export default Tests;
