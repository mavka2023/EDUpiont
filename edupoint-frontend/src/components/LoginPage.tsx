import React from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Typography, Box} from '@mui/material';
import styled from 'styled-components';
import { borderRadius, colors, fontSize, spacing } from '../styles/constants';

export const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: ${colors['gray-lt']};
    padding: ${spacing.md};
`;


export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${spacing.lg};
    background: ${colors.white};
    border-radius: ${borderRadius.md};
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
`;

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${spacing.md};
    width: 100%;

    img {
        width: 48px;
        height: 48px;
        margin-right: ${spacing.md};
    }
`;

export const ForgotPassword = styled.a`
    font-size: ${fontSize.sm};
    color: ${colors['gray-dk']};
    margin: ${spacing.md} 0 ${spacing.md};
    align-self: flex-start;

    &:hover {
        color: ${colors.primary};
        text-decoration: underline!important;
    }
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
                    Sign in
                </Typography>

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
                    fullWidth
                />

                {/* <ForgotPassword href="#">Forgot password?</ForgotPassword> */}

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    style={{marginTop: spacing.md}}
                >
                    Login
                </Button>
            </FormContainer>
        </PageContainer>
    );
};

export default LoginPage;
