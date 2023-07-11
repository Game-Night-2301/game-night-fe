import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import { NavLink } from 'react-router-dom';
import './Card.css';

const Card = ({ attendees, id, city, state, zip, title, date, hostId, description }) => {
  // const renderPills = () => {
  //   const isHost = hostId === userId;
  //   const isAttending = attendees.includes(user.id);
  //   const isFull = attendees.length === gameDetails.max_players;
  //   const capacity = `${gameDetails.min_players}-${gameDetails.max_players}`;
  //   const gameLength = gameDetails.game_length;

  //   const tags = [
  //     { label: 'mins', value: gameLength },
  //     { label: 'min/max', value: capacity },
  //     { label: 'players', value: attendees.length },
  //     isHost && { value: 'host' },
  //     isAttending && { value: 'attending' },
  //     isFull && { value: 'full' },
  //   ].filter(Boolean); // To remove falsey values from the tags array

  //   return   <Pills tags={[
  //     { label: 'mins', value: '120' },
  //     { label: 'min/max', value: '5-10' },
  //     { label: 'players', value: '7/10' },
  //     { value: 'host' },
  //   ]} />
  // };

  return (
    <NavLink to={`/events/${id}`} className='card'>
      <div className='card-header'>
        <h3 className='event-card-title'>{title}</h3>
        <h4 className='event-card-subtitle'>{city}, {state} ({zip})</h4>
        <h4 className='event-card-subtitle event-date'>{date}</h4>
        <div className='event-pill-holder'>
          {/* {renderPills()} */}
        </div>
      </div>
      <div className='card-body'>
        <p className='event-card-description'>{description}</p>
      </div>
    </NavLink>
  )
}

export default Card;