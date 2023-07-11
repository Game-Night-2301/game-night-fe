import React, { useState, useEffect, useCallback } from 'react';
import Header from '../ReusableComponents/Header/Header';
import BrowserHeader from '../ReusableComponents/BrowserHeader/BrowserHeader';
import Card from '../BrowseEvent/Card/Card';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { getAllEvents } from '../../queries/index';
import { cleanEvents, filterEvents, sortEvents } from '../../utils/cleaning';
import './BrowseEvent.css';

const BrowseEvent = ({ user }) => {
  const { loading, error, data } = useQuery(getAllEvents);

  useEffect(() => {
    console.log('Retrieved events:', data?.events);
  }, [data]);
  
  const displayEvents = () => {
    if(!data?.events?.length) {
      return <h2>No Events</h2>
    } else {
      const filteredEvents = filterEvents(data.events)
      const cleanedEvents = cleanEvents(filteredEvents)
      const sortedEvents = sortEvents(cleanedEvents)
      return sortedEvents.map(event => {
        return (
          <Card
            key={event.id}
            id={event.id}
            title={event.title}
            city={event.city}
            state={event.state}
            zip={event.zip}
            date={event.date}
            attendees={event.attendees}
            host={event.hostId}
            description={event.description}
          />
        )
      })
    }
  }
  
  return (
    <>
      <Header/>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && 
        <>
          <BrowserHeader/>
          <section className='browse-event-container'>
            {displayEvents()}
          </section>
        </>
      }
    </>
  )
}
export default BrowseEvent