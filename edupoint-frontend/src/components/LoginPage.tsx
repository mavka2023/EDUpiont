import React from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Typography, Box} from '@mui/material';
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f3f3f3;
    box-sizing: border-box;
    padding: 20px;
    margin: 0;
`;


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;

    img {
        width: 48px;
        height: 48px;
        margin-right: 10px;
    }

    h1 {
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }
`;

const ForgotPassword = styled.a`
    font-size: 14px;
    color: #888;
    margin-top: 10px;
    text-decoration: none;
    cursor: pointer;
    align-self: flex-start;

    &:hover {
        color: #555;
        text-decoration: underline;
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
                    InputProps={{
                        style: {borderRadius: '8px'},
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputProps={{
                        style: {borderRadius: '8px'},
                    }}
                />

                <ForgotPassword href="#">Forgot password?</ForgotPassword>

                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#7c4dff',
                        color: '#fff',
                        marginTop: '20px',
                        padding: '10px 20px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                    }}
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </FormContainer>
        </PageContainer>
    );
};

export default LoginPage;
