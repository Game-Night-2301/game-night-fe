import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import Button from '../../ReusableComponents/Button/Button'
import './EventInfo.css';
import { detailsDateFormatter } from '../../../utils/cleaning';

export const EventInfo = ({ hostId, id, game, time, date, attendees, loggedInUser}) => {


  const isAttending = attendees.some((attendee) => parseInt(attendee.id) === loggedInUser)
  const isHost = loggedInUser === hostId

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
        <Button Join='Join'/>
      )
    }
  }

  return (
    <div>
        <h1 className='event-title'>{game}</h1>
        <h2 className='event-date'>{detailsDateFormatter(date)}</h2>
        <h2 className='event-time'>{time}</h2>
        <div className='event-pill-holder'>
          { renderRolePill() }
        </div>
        <div className='event-button-holder'>
          { renderButton() }
        </div>
    </div>
  )
}