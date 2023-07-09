import React from 'react';
import Button from '../ReusableComponents/Button/Button';
import logo from '../../assets/Logo.svg';
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
      <img src={logo} alt="Logo" className="logo" />
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
