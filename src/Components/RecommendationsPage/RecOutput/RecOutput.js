import './RecOutput.css'
import BrowserHeader from '../../ReusableComponents/BrowserHeader/BrowserHeader'
import UserGame from '../../Profile/UserGame/UserGame';

const RecOutput = (recommendations) => {
  const mapRecs = () => {
    if (recommendations) {
      return recommendations.map(game => {
        return (
          <UserGame
            key={game.id}
            {...game}
          />
        );
      });
    }
  }


  if (!recommendations) return (
    <>
      <BrowserHeader text="Your Recommendations" />
      <p className="no-recs">You don't have any recommendations yet. Request some!</p>
    </>
  )

  return (
    <div className="games-collection">
      <BrowserHeader text="Game Collection" nomargin="true" />
      <div className="games-grid">
        {/* mapRecs() */}
        <p>Recs go here</p>
      </div>
    </div>

  )
}

export default RecOutput;