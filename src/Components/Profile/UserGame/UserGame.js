import React, { useState } from 'react';
import { Collapse, Button } from '@mui/material';
import './UserGame.css';
import PropTypes from 'prop-types';

const UserGame = ({ name, imageUrl, maxPlayers, minPlayers, maxPlaytime, minPlaytime, averageUserRating, averageStrategyComplexity, description, handleExpand, expanded, hidden }) => {
  const handleExpandClick = () => {
    handleExpand(name);
  };

  return (
    <section className={`user-game ${hidden ? 'user-game-hidden' : ''}`}>
      <div className="card-image">
        <img src={imageUrl} alt={`${name} thumbnail`} />
      </div>
      <article className="card game-card">
        <div className="card-header game-card-header">
          <h5 className="event-card-title game-card-title">{name}</h5>
        </div>
        <div className="card-body game-card-body">
          <Collapse in={!expanded} timeout="auto">
            <section className="game-card-high-level">
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Players</p>
                <p className="profile-text-value game-value">{minPlayers} - {maxPlayers}</p>
              </div>
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Estimated Playtime</p>
                <p className="profile-text-value game-value">{minPlaytime} - {maxPlaytime}</p>
              </div>
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Average User Rating</p>
                <p className="profile-text-value game-value">{averageUserRating.toFixed(2)}</p>
              </div>
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Complexity</p>
                <p className="profile-text-value game-value">{averageStrategyComplexity.toFixed(2)} / 5</p>
              </div>
            </section>
          </Collapse>
          <Collapse in={expanded} timeout="auto">
            <section className="game-card-high-level">
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Players</p>
                <p className="profile-text-value game-value">{minPlayers} - {maxPlayers}</p>
              </div>
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Estimated Playtime</p>
                <p className="profile-text-value game-value">{minPlaytime} - {maxPlaytime}</p>
              </div>
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Average User Rating</p>
                <p className="profile-text-value game-value">{averageUserRating.toFixed(2)}</p>
              </div>
              <div className="profile-key-value game-key-value">
                <p className="profile-text-key game-key">Complexity</p>
                <p className="profile-text-value game-value">{averageStrategyComplexity.toFixed(2)} / 5</p>
              </div>
            </section>
            <div dangerouslySetInnerHTML={{ __html: description }} className="description-text" />
          </Collapse>
          <Button onClick={() => handleExpandClick(name)} aria-expanded={expanded} aria-label="show more">
            {expanded ? 'Hide Description' : 'Show Description'}
          </Button>
        </div>
      </article>
    </section>
  );
};

export default UserGame;

UserGame.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  maxPlayers: PropTypes.number.isRequired,
  minPlayers: PropTypes.number.isRequired,
  maxPlaytime: PropTypes.number.isRequired,
  minPlaytime: PropTypes.number.isRequired,
  averageUserRating: PropTypes.number.isRequired,
  averageStrategyComplexity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  handleExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};