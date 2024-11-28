import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px; /
    margin-top: 50px; 
`;

const ActionButton = styled(Button)`
    && {
        border: 2px solid #fff;
        color: #fff;
        font-weight: bold;
        text-transform: none; 
        font-size: 16px;
        padding: 10px 30px;
        border-radius: 8px;

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;

const Logo = styled.img`
    width: 120px;
    position: relative;
    margin-top: -60px; 
    z-index: 2;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px; 
    z-index: 1;
`;

const HomePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    return (
        <PageContainer>
            <Typography
                variant="h1"
                style={{
                    fontWeight: 'bold',
                    fontSize: '64px',
                    marginBottom: '20px',
                    fontFamily: 'Jaro, sans-serif',
                    zIndex: 1,
                }}
            >
                EduPoint
            </Typography>

            <Logo src="logo.png" alt="EduPoint Logo" />

            <ContentContainer>
                <Typography
                    variant="h5"
                    style={{
                        fontWeight: '500',
                        marginBottom: '15px',
                    }}
                >
                    Hello
                </Typography>
                <Typography
                    variant="h4"
                    style={{
                        fontWeight: 'bold',
                        marginBottom: '15px',
                    }}
                >
                    {user?.name} {user?.surname}
                </Typography>
                <Typography
                    variant="h6"
                    style={{
                        fontWeight: '400',
                        marginBottom: '30px',
                    }}
                >
                    what do you want to do today?
                </Typography>

                <ButtonContainer>
                    <ActionButton onClick={() => navigate('/notes')}>Notes</ActionButton>
                    <ActionButton onClick={() => navigate('/tests')}>Tests</ActionButton>
                    <ActionButton onClick={() => navigate('/flashcards')}>Flashcards</ActionButton>
                </ButtonContainer>
            </ContentContainer>
        </PageContainer>
    );
};

export default HomePage;
