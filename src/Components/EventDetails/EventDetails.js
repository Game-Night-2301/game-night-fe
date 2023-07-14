import React, { useState, useEffect } from 'react';
import Header from '../ReusableComponents/Header/Header';
import './EventDetails.css';
import { Attendees } from './Attendees/Attendees';
import { Description } from './Description/Description';
import { EventInfo } from './EventInfo/EventInfo';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { getEvent } from '../../queries/index';

export const EventDetails = ({ loggedInUser, logoutUser }) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(getEvent, { variables: {
    id
  }, skip: !id });

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error :</p>; 

  return (
    <div>
      <Header logoutUser={logoutUser} />
      <div className="event-body">
        <EventInfo
          className="event-info"
          loggedInUser={loggedInUser}
          hostId={data.event.hostId}
          id={data.event.id}
          game={data.event.game}
          date={data.event.date}
          time={data.event.time}
          attendees={data.event.attendees}
          cancelled={data.event.cancelled}
        />
        <div className="event-right">
          <Description description={data.event.description} />
          <Attendees attendees={data.event.attendees} />
        </div>
      </div>
    </div>
  );
};

EventDetails.propTypes = {
  loggedInUser: PropTypes.number.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
