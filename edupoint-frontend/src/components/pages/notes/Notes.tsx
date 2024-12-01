import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Notes = () => {
  const notes: ListItemProps[] = [
    {
      title: 'Note 1',
      link: '/notes/1',
    },
    {
      title: 'Note 2',
      link: '/notes/2',
    },
    {
      title: 'Note 3',
      link: '/notes/3',
    },
    {
      title: 'Add new note',
      icon: <AddIcon style={{ fontSize: 48 }} />,
      link: '/notes/create',
      hideMenu: true,
    },
  ];

  return (
    <MainContent title="Notes" text="Here you can see and add your notes">
      <List items={notes}></List>
    </MainContent>
  );
};

export default Notes;