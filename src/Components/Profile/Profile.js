import './Profile.css'
import Header from '../ReusableComponents/Header/Header';
import BrowserHeader from '../ReusableComponents/BrowserHeader/BrowserHeader';
import UserGame from './UserGame/UserGame';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { getUserGames } from '../../queries/index';
import userIcon from '../../assets/usericon.svg';
import diceicon from '../../assets/diceicon.png';

const ProfilePage = ({logoutUser, selectedUser, userData}) => {
  const { loading, error, data } = useQuery(getUserGames, { variables: { id: selectedUser } });
  const [expandedGame, setExpandedGame] = useState(null);

  const handleExpandClick = (gameName) => {
    if(expandedGame === gameName) {
      setExpandedGame(null);
    } else {
      setExpandedGame(gameName);
    }
  };

  const mapUserGames = () => {
    if(data?.user?.ownedGames?.length) {
      console.log('Game Data', data)
      return data.user.ownedGames.map(game => {
        return (
          <UserGame 
            key={game.id}
            {...game}
            handleExpand={handleExpandClick}
            expanded={expandedGame === game.name}
            hidden={expandedGame && expandedGame !== game.name}
          />
        )
      })
    }
  }

  return (
    <>
    <Header logoutUser={logoutUser} />
      <div className="profile-page">
        <div className="profile-details">
            <div className="profile-image">
                <img src={userIcon} alt="Profile-Img" />
            </div>
            <BrowserHeader text="Personal Info" />
            <div className="profile-info">
              <section className="profile-text">
                <div className="profile-key-value">
                  <p className="profile-text-key">Name</p>
                  <p className="profile-text-value">{userData.username}</p>
                </div>
                <div className="profile-key-value">
                  <p className="profile-text-key">Games Owned</p>
                  <p className="profile-text-value">{data.user.ownedGames.length}</p>
                </div>
                <div className="profile-key-value">
                  <p className="profile-text-key">Location</p>
                  <p className="profile-text-value">{userData.city}, {userData.state}</p>
                </div>
              </section>
            </div>
        </div>
        <div className="games-collection">
          <BrowserHeader text="Game Collection" nomargin="true"/>
          <div className="games-grid">
            {mapUserGames()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage

ProfilePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};
