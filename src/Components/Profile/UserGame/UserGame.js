import React from 'react';
import './UserGame.css';

const UserGame = ({name, image, maxPlayers, minPlayers, maxPlaytime, minPlaytime, rating, complexity }) => {
  return (
    <section className="user-game">
      <div className="card-image">
        <img src={image} alt={`${name} thumbnail`} />
      </div>
      <article className="card game-card">
        <div className="card-header">
          <h5 className="event-card-title">{name}</h5>
        </div>
        <div className="game-card-body">
        </div>
      </article>
    </section>
  )
}

export default UserGame;