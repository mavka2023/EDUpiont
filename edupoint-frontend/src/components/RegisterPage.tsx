import React from 'react';
import {Button, TextField, Typography, styled as muiStyled} from '@mui/material';
import styled from 'styled-components';
import {login} from '../redux/authSlice';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { FormContainer, LogoContainer, PageContainer } from './LoginPage';
import { spacing } from '../styles/constants';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = () => {
        dispatch(
            login({
                id: '12345',
                name: 'John',
                surname: 'Doe',
                jwt: 'mock-jwt-token',
                profilePicture:
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
            })
        );
        navigate('/dashboard');
    };

    return (
        <PageContainer>
            <FormContainer>
                <LogoContainer>
                    <img src="logo.png" alt="EduPoint Logo"/>
                    <h1>EduPoint</h1>
                </LogoContainer>


                <Typography variant="h4" gutterBottom style={{fontWeight: 'bold', marginBottom: '20px'}}>
                    Sign up
                </Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="E-mail"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />


                <Button
                    variant="contained"
                    style={{
                        marginTop: spacing.md,
                    }}
                    fullWidth
                    onClick={handleRegister}
                >
                    Sign up
                </Button>
            </FormContainer>
        </PageContainer>
    );
};

export default RegisterPage;
