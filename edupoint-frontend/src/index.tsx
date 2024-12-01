import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';
import './styles/index.css';
import theme from './styles/theme'; 
import ThemeProvider from '@mui/material/styles/ThemeProvider';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
);
