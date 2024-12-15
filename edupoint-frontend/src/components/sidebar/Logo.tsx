import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Typography } from '@mui/material';
import { spacing, colors } from '../../styles/constants';
import { Link } from 'react-router-dom';

const logoShake = keyframes`
    0% {
        transform: translateX(0) rotate(0deg);
    }
    25% {
        transform: translateX(-3px) rotate(-5deg);
    }
    50% {
        transform: translateX(3px) rotate(5deg);
    }
    75% {
        transform: translateX(-3px) rotate(-5deg);
    }
    100% {
        transform: translateX(0) rotate(0deg);
    }
`;

const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    cursor: pointer;

    h1 {
        margin-left: ${spacing.md};
        transition: color 0.15s;
    }

    &:hover {
        h1 {
            color: ${colors.primary};
        }
    }
`;

const LogoImage = styled.img`
    width: 60px;

    &:hover {
            animation: ${logoShake} 0.7s infinite ease-in-out;
        }
`;

const AnimatedLogo: React.FC = () => {
    return (
        <LogoContainer to="/">
                <LogoImage src="/logo.png" alt="EduPoint logo" />
                <Typography variant="h1">EduPoint</Typography>
        </LogoContainer>
    );
};

export default AnimatedLogo;
