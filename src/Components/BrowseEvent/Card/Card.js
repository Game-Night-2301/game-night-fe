import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import { NavLink } from 'react-router-dom';
import './Card.css';

const Card = ({ user, id, gameDetails, location, date, time, attendees, host, description }) => {
  const renderPills = () => {
    // const isHost = host === user.id;
    // const isAttending = attendees.includes(user.id);
    // const isFull = attendees.length === gameDetails.max_players;
    // const capacity = `${gameDetails.min_players}-${gameDetails.max_players}`;
    // const gameLength = gameDetails.game_length;

    // const tags = [
    //   { label: 'mins', value: gameLength },
    //   { label: 'min/max', value: capacity },
    //   { label: 'players', value: attendees.length },
    //   isHost && { value: 'host' },
    //   isAttending && { value: 'attending' },
    //   isFull && { value: 'full' },
    // ].filter(Boolean); // To remove falsey values from the tags array

    return   <Pills tags={[
      { label: 'mins', value: '120' },
      { label: 'min/max', value: '5-10' },
      { label: 'players', value: '7/10' },
      { value: 'host' },
    ]} />
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='event-card-title'>Brass: Birmingham</h3>
        <h4 className='event-card-subtitle'>(Denver, CO)</h4>
        <h4 className='event-card-subtitle event-date'>Friday, 17th July 23 @ 7:00PM</h4>
        <div className='event-pill-holder'>
          {renderPills()}
        </div>
      </div>
      <div className='card-body'>
        <p className='event-card-description'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
      </div>
    </div>
    // <NavLink to={`/events/${id}`} className='card'>
    //   <div className='card-header'>
    //     <h3 className='event-card-title'>{gameDetails.name}</h3>
    //     <h4 className='event-card-subtitle'>{location}</h4>
    //     <h4 className='event-card-subtitle event-date'>{date}{time}</h4>
    //     <div className='event-pill-holder'>
    //       {renderPills()}
    //     </div>
    //   </div>
    //   <div className='card-body'>
    //     <p className='event-card-description'>{description}</p>
    //   </div>
    // </NavLink>
  )
}

export default Card;