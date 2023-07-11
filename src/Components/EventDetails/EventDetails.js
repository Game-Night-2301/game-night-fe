import React, { useState, useEffect } from 'react';
import Header from '../ReusableComponents/Header/Header';
import './EventDetails.css';
import { Attendees } from './Attendees/Attendees';
import { Description } from './Description/Description';
import { EventInfo } from './EventInfo/EventInfo';
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