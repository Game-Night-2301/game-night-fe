import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../ReusableComponents/Pills/Pills';
import './Card.css';

const Card = ({ user, id, gameDetails, location, date, time, attendees, host, description }) => {
  const isAttending = attendees.includes(user.id)
  const isHost = host === user.id
  const isFull = attendees.length === gameDetails.max_players

  const renderPills = () => {
    if (isHost) {
      <Pills content='Host' />
    }
    if (isAttending) {
      <Pills content='Attending' />
    } 
    if (isFull) {
      <Pills content='Full' />
    }
  }

  return (
    <NavLink to={`/events/${id}`} className='card'>
      <div className='card-header'>
        <h3 className='event-card-title'>{gameDetails.name}</h3>
        <h4 className='event-card-subtitle'>{location}</h4>
        <h4 className='event-card-subtitle'>{date}{time}</h4>
        <div className='event-pill-holder'>
          {renderPills()}
        </div>
      </div>
      <div className='card-body'>
        <p className='event-card-description'>{description}</p>
      </div>
    </NavLink>
  )
}

export default Card;