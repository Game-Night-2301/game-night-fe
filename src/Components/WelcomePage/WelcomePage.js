import React from 'react';
import Button from '../ReusableComponents/Button/Button';
import dice from '../../assets/Dice.svg';
import './WelcomePage.css';

function WelcomePage({ loginUser, logoutUser, loggedIn }) {
  const handleLogin = (userId) => {
    console.log('Logging in user:', userId);
    loginUser(userId);
    console.log(`User ${userId} logged in.`);
  };

  return (
    <div className="welcome-page-container">
      <h1 className="welcome-page-title">Game Night</h1>
      <img src={dice} alt="Dice logo" className="dice" />
      <h3 className="welcome-page-subtitle">Define your roll</h3>
      <div className="welcome-button-container">
          <>
      <Button className="welcome-button" text="User 1" onClick={() => handleLogin(1)} />
      <div className="welcome-spacer"></div>
      <Button className="welcome-button" text="User 2" onClick={() => handleLogin(2)} />
          </>
      </div>
    </div>
  );
}

export default WelcomePage;
