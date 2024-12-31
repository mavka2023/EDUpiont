import React from 'react';
import styled from 'styled-components';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { colors, spacing } from '../styles/constants';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 100vw;
    width: 100%;
    background-color: ${colors.primary};
    padding: ${spacing.md};

    h1, h2, h3, h4, h5, h6, p {
        font-family: 'Jaro';
        color: ${colors.white};
        letter-spacing: 2px;
        text-align: center;
    }

    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 3rem;
        font-weight: 400;
    }

    h3 {
        font-size: 1.75rem;
        font-weight: 400;
        color: ${colors['gray-lt']};
    }

`;


export const ActionButton = styled(Button)`
    && {
        border: 2px solid ${colors.white};
        color: ${colors.white};
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

export const Logo = styled.img`
    width: 120px;
    margin-top: -40px; 
    z-index: 2;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: ${spacing.md}; 
    z-index: 1;
`;

const HomePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    return (
        <PageContainer>
            <Typography variant="h1">
                EduPoint
            </Typography>

            <Logo src="logo.png" alt="EduPoint Logo" />

            <ContentContainer>
                <Typography variant="h3">
                    Hello
                </Typography>
                <Typography variant="h2" >
                    {user?.name} {user?.surname}
                </Typography>
                <Typography variant="h3">
                    what do you want to do today?
                </Typography>

                <Box display="flex" gap={spacing.md} marginTop={spacing.xl} flexWrap={'wrap'} justifyContent={'center'}>
                    <ActionButton onClick={() => navigate('/notes')}>Notes</ActionButton>
                    <ActionButton onClick={() => navigate('/tests')}>Tests</ActionButton>
                    <ActionButton onClick={() => navigate('/flashcards')}>Flashcards</ActionButton>
                </Box>
            </ContentContainer>
        </PageContainer>
    );
};

export default HomePage;
