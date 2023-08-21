import './GameResult.css';

const GameResult = ({ id, name, handleAddGame, isInCollection }) => {

  if (isInCollection) return (
    <div className="game-result in-collection">
      <p className="result-title title-in-collection">{name}</p>
      <p className="result-owned">In Collection</p>
    </div>
  );

  return (
    <div className="game-result">
      <p className="result-title">{name}</p>
      <button className="select-title-btn" onClick={() => handleAddGame(id)}>+</button>
    </div>
  );
}

export default GameResult;