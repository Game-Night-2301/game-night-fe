import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getUserGames } from '../../../queries/index';
import './Card.css';

const Card = ({ userId, attendees, id, city, state, zip, title, date, hostId, description }) => {
  const { loading, error, data } = useQuery(getUserGames, { variables: { id: userId }, skip: !id });
  const [cardGame, setCardGame] = useState(null);

  useEffect(() => {
    if (data) {
      setCardGame(data.user.ownedGames.find(game => game.id === id));
    }
  }, [data, id]);

  const renderPills = () => {
    if (cardGame) {
      const isHost = hostId === userId;
      const isAttending = attendees.includes(userId);
      const isFull = cardGame.maxPlayers === attendees.length;

      const tags = [
        isHost && { value: 'host' },
        isAttending && { value: 'attending' },
        isFull && { value: 'full' },
      ].filter(Boolean);

      return <Pills tags={tags} />
    }
  };

  return (
    <NavLink to={`/events/${id}`} className="card-link-wrapper">
      <section className='card'>
        <div className='card-header'>
          <div className='card-header-left'>
            <h3 className='event-card-title'>{title}</h3>
            <h4 className='event-card-subtitle'>{city}, {state} ({zip})</h4>
            <h4 className='event-card-subtitle event-card-date'>{date}</h4>
          </div>
          <div className='event-pill-holder'>
            {data && renderPills()}
          </div>
        </div>
        <div className='card-body'>
          <p className='event-card-description'>{description}</p>
        </div>
      </section>
    </NavLink>
  )
}

export default Card;