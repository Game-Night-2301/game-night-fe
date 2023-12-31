import './RecOutput.css';
import { useState } from 'react';
import BrowserHeader from '../../ReusableComponents/BrowserHeader/BrowserHeader';
import UserGame from '../../Profile/UserGame/UserGame';
import PropTypes from 'prop-types';

const RecOutput = ({ recommendations }) => {
  const [expandedGame, setExpandedGame] = useState('');
  const handleExpandClick = (gameName) => {
    if (expandedGame === gameName) {
      setExpandedGame('');
    } else {
      setExpandedGame(gameName);
    }
  };
  const mapRecs = () => {
    if (recommendations && recommendations.user) {
      return recommendations.user.recommendedGames.map((game) => {
        return (
          <UserGame
            key={game.id}
            {...game}
            expanded={expandedGame === game.name}
            hidden={expandedGame && expandedGame !== game.name}
            handleExpand={handleExpandClick}
          />
        );
      });
    }
  };

  if (
    !recommendations ||
    !recommendations.user ||
    !recommendations.user.recommendedGames.length
  )
    return (
      <div className="games-collection">
        <BrowserHeader text="Recommendations for You" />
        <div className="no-recs-wrapper">
          <h5 className="no-recs">
            You don't have any recommendations yet. Try asking for some!
          </h5>
        </div>
      </div>
    );

  return (
    <div className="games-collection">
      <BrowserHeader text="Recommendations for You" nomargin="true" />
      <div className="games-grid">{mapRecs()}</div>
    </div>
  );
};

export default RecOutput;

RecOutput.propTypes = {
  recommendations: PropTypes.shape({
    user: PropTypes.shape({
      recommendedGames: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }),
};

