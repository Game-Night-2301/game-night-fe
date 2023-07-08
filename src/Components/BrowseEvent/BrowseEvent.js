import React, { useState, useEffect, useCallback } from 'react';
import Header from '../ReusableComponents/Header/Header';
import BrowserHeader from '../ReusableComponents/BrowserHeader/BrowserHeader';
import PropTypes from 'prop-types';
import './BrowseEvent.css';

const BrowseEvent = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const getEvents = useCallback(async () => {
    try {
      const data = await // graphql query to get events
      // const cleanedEvents = cleanEvents(data)
      // we'll need to reformat the data, filter out cancelled events if the query doesn't handle that, and sort them in some way
      setEvents(data)
    } catch (error) {
      setError(error.message)
    }
  }, [])

  useEffect(() => {
    getEvents()
  }, [getEvents])

  const displayEvents = () => {
    if(!events.length) {
      return <h2>No Events</h2>
    } else {
      return events.map(event => {
        return (
          <Card
            key={event.id}
            id={event.id}
            gameDetails={event.game_details}
            location={event.location}
            date={event.date}
            time={event.time}
            attendees={event.attendees}
            host={event.host_id}
            description={event.event_description}
          />
        )
      })
    }
  }

  return (
    <>
      <Header/>
      <BrowserHeader/>
      <section className='browse-event-container'>
        {displayEvents()}
      </section>
    </>
  )
}