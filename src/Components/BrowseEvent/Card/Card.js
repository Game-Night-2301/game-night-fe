import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import { NavLink } from 'react-router-dom';
import './Card.css';

const Card = ({ userId, attendees, id, city, state, zip, title, date, hostId, description }) => {
  const renderPills = () => {
    const isHost = hostId === userId;
    const isAttending = attendees.includes(userId);
    const isFull = true;
    const capacity = "4/10";
    const gameLength = 120;

    const tags = [
      { label: 'mins', value: gameLength },
      { label: 'player', value: capacity },
      { label: 'players', value: attendees.length },
      isHost && { value: 'host' },
      isAttending && { value: 'attending' },
      isFull && { value: 'full' },
    ].filter(Boolean); // To remove falsey values from the tags array

    return   <Pills tags={tags} />
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
            {renderPills()}
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