import React from 'react';
import { StyledButton } from './styles';
import { ButtonProps as MuiButtonProps } from '@mui/material';


interface ButtonProps extends MuiButtonProps {
  children: string;
  alt?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, alt, ...props }) => {
  return (
    <StyledButton {...props} alt>
      {children}
    </StyledButton>
  );
};

export default Button;