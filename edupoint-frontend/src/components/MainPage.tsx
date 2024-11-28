import React from 'react';
import {Button, Typography} from '@mui/material';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #7c4dff;
    color: #fff;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
`;

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

const Logo = styled.img`
    width: 120px;
    position: absolute;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
`;

const StyledButton = styled(Button)`
    && {
        border: 2px solid #fff;
        color: #fff;
        text-transform: none;
        font-size: 16px;
        font-weight: bold;
        padding: 15px 50px;
        border-radius: 8px;
        margin-top: 30px;

        &:hover {
            background-color: rgba(255, 255, 255, 0.9);
        }
    }
`;

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            {/* Кнопка "Log In" */}
            <LoginButton onClick={() => navigate('/login')}>Log In</LoginButton>

            <ContentContainer>


                <Typography
                    variant="h1"
                    gutterBottom
                    style={{
                        fontWeight: 'bold',
                        fontSize: '100px',
                        letterSpacing: '2px',
                        marginBottom: '100px',
                        fontFamily: 'Jaro, sans-serif',
                    }}
                >
                    EduPoint
                </Typography>
                <Logo src="logo.png" alt="EduPoint Logo"/>


                <Typography
                    variant="h6"
                    style={{
                        fontWeight: '500',
                        lineHeight: '1.5',
                        marginBottom: '20px',

                    }}
                >
                    <span style={{fontWeight: 'bold'}}>Simple</span> and{' '}
                    <span style={{fontWeight: 'bold'}}>fast</span> to get your<br/>{' '}
                    <span style={{fontWeight: 'bold'}}>notes</span>,{' '}
                    <span style={{fontWeight: 'bold'}}>quizzes</span> and{' '}
                    <span style={{fontWeight: 'bold'}}>flashcards</span> done.
                </Typography>


                <StyledButton onClick={() => navigate('/register')}>
                    Get Started
                </StyledButton>
            </ContentContainer> </PageContainer>
    );
};

export default MainPage;
