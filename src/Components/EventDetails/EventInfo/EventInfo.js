import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import Pills from '../../ReusableComponents/Pills/Pills';
import Button from '../../ReusableComponents/Button/Button';
import './EventInfo.css';
import { detailsDateFormatter } from '../../../utils/cleaning';
import {
  addUserToEvent,
  getEvent,
  cancelEvent,
  removeUserFromEvent,
} from '../../../queries';

export const EventInfo = ({
  hostId,
  id,
  startTime,
  endTime,
  date,
  attendees,
  loggedInUser,
  cancelled,
  gameDetails,
  full,
}) => {
  const isAttending = attendees.some(
    (attendee) => parseInt(attendee.id) === loggedInUser
  );
  const isHost = loggedInUser === hostId;

  const [
    joinEvent,
    { data: joinData, loading: joinLoading, error: joinError },
  ] = useMutation(addUserToEvent, {
    refetchQueries: [getEvent],
  });
  const [
    leaveEvent,
    { data: leaveData, loading: leaveLoading, error: leaveError },
  ] = useMutation(removeUserFromEvent, {
    refetchQueries: [getEvent],
  });
  const [
    cancelGroupEvent,
    { data: cancelData, loading: cancelLoading, error: cancelError },
  ] = useMutation(cancelEvent, {
    refetchQueries: [getEvent],
  });

  const renderRolePill = () => {
    if (cancelled) {
      return <Pills tags={[{ value: 'Cancelled' }]} />;
    } else if (isHost) {
      return <Pills tags={[{ value: 'Host' }]} />;
    } else if (isAttending) {
      return <Pills tags={[{ value: 'Attending' }]} />;
    } else if (full) {
      return <Pills tags={[{ value: 'Event Full' }]} />;
    }
  };

  const renderButton = () => {
    if (isHost && !cancelled) {
      return (
        <Button
          text="Cancel Event"
          onClick={() => {
            cancelGroupEvent({
              variables: {
                input: {
                  hostId: parseInt(loggedInUser),
                  id: parseInt(id),
                  cancelled: true,
                },
              },
            });
          }}
        />
      );
    } else if (!isAttending && loggedInUser && !cancelled && !full) {
      return (
        <Button
          text="Join"
          disabled={joinLoading}
          onClick={() => {
            joinEvent({
              variables: {
                input: {
                  userId: parseInt(loggedInUser),
                  eventId: parseInt(id),
                },
              },
            });
          }}
        />
      );
    } else if (isAttending && !cancelled) {
      return (
        <Button
          text="Leave Group"
          onClick={() => {
            leaveEvent({
              variables: {
                input: {
                  userId: parseInt(loggedInUser),
                  eventId: parseInt(id),
                },
              },
            });
          }}
        />
      );
    }
  };
  return (
    <div>
      <h1 className="event-title">{gameDetails.name}</h1>
      <div className="event-pill-holder">{renderRolePill()}</div>
      <h2 className="event-date">{detailsDateFormatter(date)}</h2>
      <h2 className="event-time">
        {startTime} - {endTime}
      </h2>
      <div>
        <img
          className="game-image"
          src={gameDetails.imageUrl}
          alt={gameDetails.name}
        />
      </div>
      <div className="event-button-holder">{renderButton()}</div>
    </div>
  );
};

EventInfo.propTypes = {
  hostId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  gameDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    minPlayers: PropTypes.number.isRequired,
    maxPlayers: PropTypes.number.isRequired,
    minPlaytime: PropTypes.number.isRequired,
    maxPlaytime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    averageUserRating: PropTypes.number.isRequired,
    averageStrategyComplexity: PropTypes.number.isRequired,
  }).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  loggedInUser: PropTypes.number.isRequired,
};
