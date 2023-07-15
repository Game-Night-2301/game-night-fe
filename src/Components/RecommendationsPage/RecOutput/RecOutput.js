import './RecOutput.css'
import BrowserHeader from '../../ReusableComponents/BrowserHeader/BrowserHeader'
import UserGame from '../../Profile/UserGame/UserGame';

const RecOutput = ({ recommendations }) => { // Destructure the recommendations prop directly
  const mapRecs = () => {
    if (recommendations && recommendations.user) {
      return recommendations.user.recommendedGames.map(game => {
        return (
          <UserGame
            key={game.id}
            {...game}
          />
        );
      });
    }
  }

  if (!recommendations || !recommendations.user || !recommendations.user.recommendedGames.length) return (
    <div className="games-collection">
      <BrowserHeader text="Recommendations for You" />
      <div className="no-recs-wrapper">
        <h5 className="no-recs">You don't have any recommendations yet. Try asking for some!</h5>
      </div>
    </div>
  )

  return (
    <div className="games-collection">
      <BrowserHeader text="Recommendations for You" nomargin="true" />
      <div className="games-grid">
          {mapRecs()}
        <p>Recs go here</p>
      </div>
    </div>

  )
}

export default RecOutput;
