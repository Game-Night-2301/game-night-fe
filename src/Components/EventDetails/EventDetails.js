import React, { useState, useEffect } from 'react';
import Header from '../ReusableComponents/Header/Header';
import './EventDetails.css';
import { Attendees } from './Attendees/Attendees';
import { Description } from './Description/Description';
import { EventInfo } from './EventInfo/EventInfo';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client'; 
import { useParams } from 'react-router-dom';
import { getEvent } from '../../queries';

export const EventDetails = () => {
  const {id} = useParams();

  const { loading, error, data } = useQuery(getEvent, { variables: {
    id
  }, skip: !id });

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error :</p>; 

  return (
    <div>
      <Header />
      <EventInfo hostId={data.hostId} id={data.id} game={data.game} date={data.date} time={data.time} attendees={data.attendees}/>
      <Description description={data.description} />
      <Attendees attendees={data.attendees}/>
    </div>
  )
}