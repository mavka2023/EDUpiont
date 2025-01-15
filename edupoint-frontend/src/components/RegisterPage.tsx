import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { login } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormContainer, LogoContainer, PageContainer } from './LoginPage';
import { spacing } from '../styles/constants';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

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

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <PageContainer>
            <FormContainer>
                <LogoContainer>
                    <img src="logo.png" alt="EduPoint Logo" />
                    <h1>EduPoint</h1>
                </LogoContainer>

                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                    Sign up
                </Typography>

                <TextField
                    label="Username"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!error && !username}
                    helperText={error && !username ? 'Username is required' : ''}
                    inputProps={{ autoComplete: 'off' }}
                />
                <TextField
                    label="E-mail"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error && !email}
                    helperText={error && !email ? 'E-mail is required' : ''}
                    inputProps={{ autoComplete: 'off' }}
                />
                <TextField
                    label="Password"
                    type="password"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error && !password}
                    helperText={error && !password ? 'Password is required' : ''}
                    inputProps={{ autoComplete: 'off' }}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!error && !confirmPassword}
                    helperText={error && !confirmPassword ? 'Confirm Password is required' : ''}
                    inputProps={{ autoComplete: 'off' }}
                />

                {error && (
                    <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    style={{ marginTop: spacing.md }}
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
