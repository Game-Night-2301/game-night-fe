import React from 'react';
import './Profile.css'
import Header from '../ReusableComponents/Header/Header';
import userIcon from '../../assets/usericon.svg';
import diceicon from '../../assets/diceicon.png';



const ProfilePage = () => {
  return (
    <>
    <Header />
      <div className="profilePage">
        <div className="profileDetails">
          <div className="profileImage">
            <img src={userIcon} alt="Profile-Img" />
          </div>
          <div className="profileInfo">
            <h2 className="userName">John Doe</h2>
            <p>Games Hosted: 5</p>
            <p>Location: City, State</p>
          </div>
        </div>
        <div className="gamesCollection">
          <h2>Game Collection</h2>
          <div className="gamesImages">
            <div className="gameCircle">
              <img src={diceicon} alt="Game 1" />
            </div>
            <div className="gameCircle">
              <img src={diceicon} alt="Game 2" />
            </div>
            <div className="gameCircle">
              <img src={diceicon} alt="Game 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage