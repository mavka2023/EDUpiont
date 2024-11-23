import { ListItem, ListItemButton } from "@mui/material";
import styled from "styled-components";
import { colors } from "../../styles/constans";
import { ForwardRefExoticComponent, ReactElement, ReactNode } from "react";


export const StyledListItem = styled(ListItem)`
    border: 1px solid ${colors.black};
    background: ${colors['gray-lt']};
    border-radius: 10px;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
`

export const StyledListItemButton = styled(ListItemButton)<{component?: ForwardRefExoticComponent<any>, to?: string, onClick?: () => void}>`
    width: 100%;

    > div {
        text-align: center;
    }
`