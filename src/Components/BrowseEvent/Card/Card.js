import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getUserGames } from '../../../queries/index';
import './Card.css';

const Card = ({ userId, attendees, id, maxPlayers, city, state, date, hostId, description, distance, gameName }) => {
  const { loading, error, data } = useQuery(getUserGames, { variables: { id: userId }, skip: !id });

  const renderPills = () => {
    const isHost = hostId === userId;
    const isAttending = attendees.includes(userId);
    const isFull = maxPlayers === attendees.length;

    const tags = [
      isHost && { value: 'host' },
      isAttending && { value: 'attending' },
      isFull && { value: 'full' },
    ].filter(Boolean);

    return <Pills tags={tags} />;
  };

  return (
    <NavLink to={`/events/${id}`} className="card-link-wrapper">
      <section className="card">
        <div className="card-header">
          <div className="card-header-left">
            <h3 className="event-card-title">{gameName}</h3>
            <h4 className="event-card-subtitle">
              {city}, {state}
            </h4>
            <h4 className="event-card-subtitle event-card-date">{date}</h4>
          </div>
          <div className="event-pill-holder">{data && renderPills()}</div>
        </div>
        <div className="card-body">
          <p className="event-card-description">{description}</p>
        </div>
      </section>
    </NavLink>
  );
};

export default Card;

Card.propTypes = {
  userId: PropTypes.number.isRequired,
  attendees: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hostId: PropTypes.number,
  description: PropTypes.string.isRequired,
};
