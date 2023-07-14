import React from 'react';
import PropTypes from 'prop-types';
import userIcon from '../../../assets/usericon.svg';
import Tooltip from '@mui/material/Tooltip';
import './Attendees.css';

export const Attendees = ({ attendees }) => {
  const renderAttendees = attendees.map((attendee) => {
    return (
      <Tooltip title={attendee.username} key={attendee.id}>
        <img src={userIcon} alt={attendee.id} className="attendee-img" />
      </Tooltip>
    );
  });

  return (
    <div className="attendees-wrapper">
      <h4 className="attendee-header">People</h4>
      <hr className="attendee-line" />
      <div className="attendees-holder">{renderAttendees}</div>
    </div>
  );
};

Attendees.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
};
