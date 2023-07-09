import React from 'react';
import Button from '../ReusableComponents/Button/Button';
import dice from '../../assets/Dice.svg';
import './WelcomePage.css';

function WelcomePage({ loginUser, logoutUser, loggedIn }) {
  const handleLogin = (userId) => {
    loginUser(userId);
    console.log(`User ${userId} logged in.`);
  };

  const handleLogout = () => {
    logoutUser();
    console.log('User logged out.');
  };

  return (
    <div className="welcome-page-container">
      <h1 className="welcome-page-title">Game Night</h1>
      <img src={dice} alt="Dice logo" className="dice" />
      <h3 className="welcome-page-subtitle">Define your roll</h3>
      <div className="button-container">
        {!loggedIn ? (
          <>
            <Button text="User 1" onClick={() => handleLogin(1)} />
            <Button text="User 2" onClick={() => handleLogin(2)} />
          </>
        ) : (
          <Button text="Log Out" onClick={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
