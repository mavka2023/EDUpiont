import React from 'react';
import {Button, TextField, Typography, styled as muiStyled} from '@mui/material';
import styled from 'styled-components';
import {login} from '../redux/authSlice';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f3f3f3;
    padding: 20px;
    box-sizing: border-box;
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

const CustomTextField = muiStyled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 700,
        color: '#333',
        '& input': {
            fontWeight: 700,
        },
        '& fieldset': {
            borderColor: '#e0e0e0',
        },
        '&:hover fieldset': {
            borderColor: '#bdbdbd',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#7c4dff',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#888',
        fontSize: '14px',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#7c4dff',
    },
});


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


                <CustomTextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <CustomTextField
                    label="E-mail"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <CustomTextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <CustomTextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />


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
                    onClick={handleRegister}
                >
                    Sign up
                </Button>
            </FormContainer>
        </PageContainer>
    );
};

export default RegisterPage;
