import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import Pills from '../../ReusableComponents/Pills/Pills';
import Button from '../../ReusableComponents/Button/Button';
import './EventInfo.css';
import { detailsDateFormatter } from '../../../utils/cleaning';
import { addUserToEvent, getEvent, removeUserFromEvent } from '../../../queries';

export const EventInfo = ({ hostId, id, game, time, date, attendees, loggedInUser}) => {


  const isAttending = attendees.some((attendee) => parseInt(attendee.id) === loggedInUser)
  const isHost = loggedInUser === hostId

  const [joinEvent, { data: joinData, loading: joinLoading, error: joinError }] = useMutation(addUserToEvent, {
    refetchQueries:[getEvent]
  });
  const [leaveEvent, { data: leaveData, loading: leaveLoading, error: leaveError }] = useMutation(removeUserFromEvent);

  const renderRolePill = () => {
  
      if (isHost) {
        return (
          <Pills tags={[{value: "Host"}]} />
        )
      }
      else if (isAttending) {
        return (
          <Pills tags={[{value: "Attending"}]}/>
        )
      } 
    }

  const renderButton = () => {
    if(isHost) {
      return (
        <Button text='Host Actions'/>
      )
    }
    else if (!isAttending && loggedInUser) {
      return (
        <Button text='Join' disabled={joinLoading} onClick={()=>{
          joinEvent({variables: {input: {userId: parseInt(loggedInUser), eventId: parseInt(id)}}})}}
          />
      )
    }
    else if (isAttending) {
      return (
        <Button text='Leave Group' 
        onClick={()=>{
          leaveEvent({variables: {input: {userId: parseInt(loggedInUser), eventId: parseInt(id)}}})}}
          />
      )
    }
  }
console.log(attendees)
  return (
    <div>
        <h1 className='event-title'>{game}</h1>
        <div className='event-pill-holder'>
          { renderRolePill() }
        </div>
        <h2 className='event-date'>{detailsDateFormatter(date)}</h2>
        <h2 className='event-time'>{time}</h2>
        <div className='event-button-holder'>
          { renderButton() }
        </div>
    </div>
  )
}