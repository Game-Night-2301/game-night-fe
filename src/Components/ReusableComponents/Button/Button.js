import React from 'react';
import '../Button/Button.css';
import MuiButton from '@mui/material/Button';

const Button = ({ text, onClick, disabled, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

    const buttonStyle = {
      fontWeight: 'bold',
    }

  return (
    <MuiButton variant="contained" style={buttonStyle} className={`button ${className} ${disabled ? 'button-disabled' : ''}`} onClick={handleClick} disabled={disabled}>
      {text}
    </MuiButton>
  );
};

export default Button;