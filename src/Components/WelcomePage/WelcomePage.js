import React from 'react';
import Button from '../ReusableComponents/Button/Button';
import dice from '../../assets/Dice.svg';
import './WelcomePage.css';
import PropTypes from 'prop-types';

function WelcomePage({ loginUser, logoutUser, loggedIn }) {
  const handleLogin = (userId) => {
    loginUser(userId);
  };

  return (
    <div className="welcome-page-container">
      <h1 className="welcome-page-title">Game Night</h1>
      <img src={dice} alt="Dice logo" className="dice" />
      <h3 className="welcome-page-subtitle">Define your roll</h3>
      <div className="welcome-button-container">
          <Button className="welcome-button" text="User 1" onClick={() => handleLogin(1)} />
          <Button className="welcome-button" text="User 2" onClick={() => handleLogin(2)} />
      </div>
    </div>
  );
}

export default WelcomePage;

WelcomePage.propTypes = {
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
  loggedIn: PropTypes.bool,
};
