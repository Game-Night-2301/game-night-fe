import React, { useState, useEffect, useCallback } from 'react';
import Header from '../ReusableComponents/Header/Header';
import BrowserHeader from '../ReusableComponents/BrowserHeader/BrowserHeader';
import Card from '../BrowseEvent/Card/Card';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { getAllEvents } from '../../queries/index';
import { cleanEvents, filterEvents, sortEvents } from '../../utils/cleaning';
import './BrowseEvent.css';

const BrowseEvent = ({ selectedUser, logoutUser }) => {
  const { loading, error, data } = useQuery(getAllEvents, {
    variables: { id: selectedUser },
    skip: !selectedUser
  });

  const displayEvents = () => {
    if (!data?.user.sortedEvents?.length) {
      return <h2>No Events</h2>;
    } else {
      const filteredEvents = filterEvents(data.user.sortedEvents);
      const cleanedEvents = cleanEvents(filteredEvents);
      return cleanedEvents.map(event => {
        return (
          <Card
            key={event.id}
            userId={selectedUser}
            id={event.id}
            game={event.game}
            title={event.title}
            city={event.city}
            state={event.state}
            zip={event.zip}
            date={event.date}
            attendees={event.attendees}
            hostId={event.hostId}
            gameName={event.gameName}
            description={event.description}
            distance={event.distanceFrom}
            maxPlayers={event.maxPlayers}
          />
        );
      });
    }
  };

  return (
    <>
      <Header logoutUser={logoutUser} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <BrowserHeader text="Open Games" />
          <section className="browse-event-container">{displayEvents()}</section>
        </>
      )}
    </>
  );
};
export default BrowseEvent;


BrowseEvent.propTypes = {
  selectedUser: PropTypes.number,
  logoutUser: PropTypes.func,
};
