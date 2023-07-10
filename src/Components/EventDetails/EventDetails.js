import React, { useState, useEffect } from 'react';
import Header from '../ReusableComponents/Header/Header';
import './EventDetails.css';
import './Attendees/Attendees';
import './Description/Description';
import './EventInfo/EventInfo';
import PropTypes from 'prop-types';

export const EventDetails = ({ user, id, gameDetails, date, time, attendees, host, description }) => {
  return (
    <div>
      <Header />
      <EventInfo />
      <Description />
      <Attendees />
    </div>
  )
}