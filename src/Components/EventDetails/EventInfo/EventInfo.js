import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import Pills from '../../ReusableComponents/Pills/Pills';
import Button from '../../ReusableComponents/Button/Button';
import './EventInfo.css';
import { detailsDateFormatter } from '../../../utils/cleaning';
import { addUserToEvent } from '../../../queries';

export const EventInfo = ({ hostId, id, game, time, date, attendees, loggedInUser}) => {


  const isAttending = attendees.some((attendee) => parseInt(attendee.id) === loggedInUser)
  const isHost = loggedInUser === hostId

  const [joinEvent, {data, loading, error}] = useMutation(addUserToEvent);

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
    else if (!isAttending) {
      return (
        <Button text='Join' disabled={loading} onClick={()=>{
          joinEvent({variables: {input: {userId: loggedInUser, eventId: id}}})
        }}/>
      )
    }
    else if (isAttending) {
      return (
        <Button text='Leave Group' 
        // onClick={()=>{
          // joinEvent({variables: {input: {userId: loggedInUser, eventId: id}}})}}
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