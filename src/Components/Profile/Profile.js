import './Profile.css'
import Header from '../ReusableComponents/Header/Header';
import BrowserHeader from '../ReusableComponents/BrowserHeader/BrowserHeader';
import UserGame from './UserGame/UserGame';
import { useQuery } from '@apollo/client';
import { getUserGames } from '../../queries/index';
import userIcon from '../../assets/usericon.svg';
import diceicon from '../../assets/diceicon.png';

const ProfilePage = ({logoutUser, selectedUser}) => {
  const { loading, error, data } = useQuery(getUserGames, { variables: { id: 1 } });

  const mapUserGames = () => {
    if(data?.user?.ownedGames?.length) {
      console.log('Game Data', data)
      return data.user.ownedGames.map(game => {
        return (
          <UserGame 
            key={game.id}
            name={game.name}
            image={game.imageUrl}
            maxPlayers={game.maxPlayers}
            minPlayers={game.minPlayers}
            minPlaytime={game.minPlaytime}
            maxPlaytime={game.maxPlaytime}
            complexity={game.averageStrategyComplexity}
            rating={game.averageUserRating}
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
                  <p className="profile-text-value">John Doe</p>
                </div>
                <div className="profile-key-value">
                  <p className="profile-text-key">Games Hosted</p>
                  <p className="profile-text-value">5</p>
                </div>
                <div className="profile-key-value">
                  <p className="profile-text-key">Location</p>
                  <p className="profile-text-value">City, State</p>
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
