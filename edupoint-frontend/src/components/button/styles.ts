import { Button, styled } from '@mui/material';
import { colors, spacing } from '../../styles/constans';

interface StyledButtonProps {
    alt?: boolean;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
    background: ${props => props.alt ? colors.secondary : colors.primary};
    border-radius: 50px;
    padding: ${spacing.sm} ${spacing.md};
`;