import React from 'react';
import PropTypes from 'prop-types';
import userIcon from '../../assets/usericon.svg';
import './Attendees.css';

export const Attendees = ( { user, attendees, id, gameDetails} ) => {
  const renderAttendees = () => {
    for (let i = 0; i < attendees.length; i++) {
      return (
          <img src={userIcon} alt={user.id} className="dice" />
      )
    }
  }

  return (
    <div>
      <h4>People</h4>
        <div>
          {renderAttendees()}
        </div>
    </div>
  )
}