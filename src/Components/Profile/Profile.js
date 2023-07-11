import React from 'react';
import './Profile.css'
import Header from '../ReusableComponents/Header/Header';
import userIcon from '../../assets/usericon.svg';
import diceicon from '../../assets/diceicon.png';

const ProfilePage = () => {
  return (
    <>
    <Header />
      <div className="profile-page">
        <div className="profile-details">
          <div className="profile-image">
            <img src={userIcon} alt="Profile-Img" />
          </div>
          <div className="profile-info">
            <h2 className="user-name">Personal Info</h2>
            <p>Name: John Doe</p>
            <p>Games Hosted: 5</p>
            <p>Location: City, State</p>
          </div>
        </div>
        <div className="games-collection">
          <h2>Game Collection</h2>
          <div className="games-images">
            <div className="game-circle">
              <img src={diceicon} alt="Game 1" />
            </div>
            <div className="game-circle">
              <img src={diceicon} alt="Game 2" />
            </div>
            <div className="game-circle">
              <img src={diceicon} alt="Game 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage