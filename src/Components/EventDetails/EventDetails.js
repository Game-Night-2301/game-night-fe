import React from 'react';
import Header from '../ReusableComponents/Header/Header';
import './EventDetails.css';
import { Attendees } from './Attendees/Attendees';
import { Description } from './Description/Description';
import { EventInfo } from './EventInfo/EventInfo';
import PageLoader from '../ReusableComponents/PageLoader/PageLoader';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useParams, Redirect } from 'react-router-dom';
import { fullQuery, getEvent } from '../../queries/index';

export const EventDetails = ({ user }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getEvent, {
    variables: {
      id,
    },
    skip: !id,
  });

  const {
    loading: fullLoading,
    error: fullError,
    data: fullData,
  } = useQuery(fullQuery, {
    variables: {
      id,
    },
    skip: !id,
  });

  if (loading || fullLoading) return <PageLoader />;
  if (error || fullError) return <Redirect to="/error" />;
  return (
    <>
      <Header />
      <div className="event-details-page">
        <EventInfo
          className="event-info"
          hostId={data.event.hostId}
          id={data.event.id}
          game={data.event.game}
          date={data.event.date}
          startTime={data.event.startTime}
          endTime={data.event.endTime}
          attendees={data.event.attendees}
          cancelled={data.event.cancelled}
          gameDetails={data.event.gameDetails}
          full={fullData.event.full}
        />
        <div className="event-right">
          <Description
            gameDescription={data.event.gameDetails.description}
            description={data.event.description}
            lat={data.event.lat}
            lon={data.event.lon}
            address={data.event.address}
            city={data.event.city}
            state={data.event.state}
            zip={data.event.zip}
          />
          <Attendees attendees={data.event.attendees} />
        </div>
      </div>
    </>
  );
};