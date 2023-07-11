import React from 'react';
import '../Button/Button.css';
import MuiButton from '@mui/material/Button';

const Button = ({ text, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <MuiButton variant="contained" className="button" onClick={handleClick}>
      {text}
    </MuiButton>
  );
};

export default Button;