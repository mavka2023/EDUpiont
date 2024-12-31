import React from 'react';
import {Button, Typography} from '@mui/material';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { ActionButton, Logo, PageContainer } from './HomePage';
import { spacing } from '../styles/constants';

const LoginButton = styled(Typography)`
    position: absolute;
    top: 20px;
    right: 30px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    color: #fff;

    &:hover {
        text-decoration: underline;
    }
`;


const ContentContainer = styled.div`
    text-align: center;
    position: relative;
    max-width: 600px;
`;

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            {/* Кнопка "Log In" */}
            <LoginButton onClick={() => navigate('/login')}>Log In</LoginButton>

            <ContentContainer>
                <Typography variant="h1">
                    EduPoint
                </Typography>

                <Logo src="logo.png" alt="EduPoint Logo"/>


                <Typography variant="h3" style={{marginBottom: spacing.xl}}>
                    <span style={{fontWeight: 'bold'}}>Simple</span> and{' '}
                    <span style={{fontWeight: 'bold'}}>fast</span> to get your<br/>{' '}
                    <span style={{fontWeight: 'bold'}}>notes</span>,{' '}
                    <span style={{fontWeight: 'bold'}}>quizzes</span> and{' '}
                    <span style={{fontWeight: 'bold'}}>flashcards</span> done.
                </Typography>


                <ActionButton onClick={() => navigate('/register')}>
                    Get Started
                </ActionButton>
            </ContentContainer> </PageContainer>
    );
};

export default MainPage;
