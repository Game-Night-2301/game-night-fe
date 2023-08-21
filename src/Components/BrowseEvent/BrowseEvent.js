import React from 'react';
import Header from '../ReusableComponents/Header/Header';
import BrowserHeader from '../ReusableComponents/BrowserHeader/BrowserHeader';
import Card from '../BrowseEvent/Card/Card';
import PageLoader from '../ReusableComponents/PageLoader/PageLoader';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { getAllEvents } from '../../queries/index';
import { cleanEvents, filterEvents } from '../../utils/cleaning';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BrowseEvent = () => {
  const user = useSelector((state) => state.user);
  const { loading, error, data } = useQuery(getAllEvents, {
    variables: { id: Number(user.id) }
  });

  const displayEvents = () => {
    if (!data?.user.sortedEvents?.length) {
      return <h2>No Events</h2>;
    } else {
      const filteredEvents = filterEvents(data.user.sortedEvents);
      const cleanedEvents = cleanEvents(filteredEvents);
      return cleanedEvents.map((event) => {
        return (
          <Card
            key={event.id}
            userId={user.id}
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

  if (loading) return <PageLoader />;
  if (error) return <Redirect to="/error" />;

  return (
    <>
      <Header/>
      <BrowserHeader text="Open Games" />
      <section className="browse-event-container">{displayEvents()}</section>
    </>
  );
};
export default BrowseEvent;

BrowseEvent.propTypes = {
  selectedUser: PropTypes.number,
  logoutUser: PropTypes.func,
};
