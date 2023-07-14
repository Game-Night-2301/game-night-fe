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
  game,
  time,
  date,
  attendees,
  loggedInUser,
  cancelled,
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
    if (isHost) {
      return <Pills tags={[{ value: 'Host' }]} />;
    } else if (isAttending) {
      return <Pills tags={[{ value: 'Attending' }]} />;
    } else if (cancelled) {
      return <Pills tags={[{ value: 'Cancelled' }]} />;
    }
  };

  const renderButton = () => {
    if (isHost) {
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
    } else if (!isAttending && loggedInUser) {
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
    } else if (isAttending) {
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
      <h1 className="event-title">{game}</h1>
      <div className="event-pill-holder">{renderRolePill()}</div>
      <h2 className="event-date">{detailsDateFormatter(date)}</h2>
      <h2 className="event-time">{time}</h2>
      <div className="event-button-holder">{renderButton()}</div>
    </div>
  );
};

EventInfo.propTypes = {
  hostId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  loggedInUser: PropTypes.number.isRequired,
};
