import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(
      login({
        id: '12345',
        name: 'John',
        surname: 'Doe',
        jwt: 'mock-jwt-token',
        profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
      })
    );
    navigate('/dashboard');
  };

  return (
    <LoginContainer>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField label="Username" variant="outlined" margin="normal" />
      <TextField label="Password" type="password" variant="outlined" margin="normal" />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </LoginContainer>
  );
};

export default LoginPage;
