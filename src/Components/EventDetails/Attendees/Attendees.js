import React from 'react';
import PropTypes from 'prop-types';
import userIcon from '../../../assets/usericon.svg';
import './Attendees.css';

export const Attendees = ( { attendees, id, game} ) => {
  const renderAttendees = attendees.map( attendee => {
      return (
        <img src={userIcon} alt={attendee.id} className="attendee-img" />
      )
    });

  return (
    <div className="attendees-wrapper">
      <h4 className="attendee-text">People</h4>
      <hr className="attendee-line" />
        <div>
          {renderAttendees}
        </div>
    </div>
  )
}