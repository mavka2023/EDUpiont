import styled from "styled-components";
import { colors, spacing } from '../../styles/constants';

export const StyledMainContent = styled.main`
    display: flex;
    flex-direction: column;
    padding: ${spacing.xl};
    gap: ${spacing.md};
    width: 100%;
    background: ${colors['gray-lt']};
    overflow-y: auto;
`