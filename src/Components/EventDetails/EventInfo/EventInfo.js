import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import { Button } from '../..ReusableComponents/Button/Button'
import './EventInfo.css';

export const EventInfo = ({ user, id, gameDetails, date, time, attendees, host}) => {

  const renderRolePills = () => {
    const isAttending = attendees.includes(user.id)
    const isHost = host === user.id
    const isFull = attendees.length === gameDetails.max_players
  
    const renderPill = () => {
      if (isHost) {
        <Pills content='Host' />
      }
      else if (isAttending) {
        <Pills content='Attending' />
      } 
      else if (isFull) {
        <Pills content='Full' />
      }
    }

  const renderButton = () => {
    if(isHost) {
      <Button content='Host Actions'/>
    }
    else if (!attendees.includes(user.id)) {
      <Button content='Join'/>
    }
  }

  return (
    <div>
        <h1 className='event-title'>{gameDetails.name}</h1>
        <h2 className='event-date'>{date}</h2>
        <h2 className='event-time'>{time}</h2>
        <div className='event-pill-holder'>
          { renderPill() }
        </div>
        <div className='event-button-holder'>
          { renderButton() }
        </div>
    </div>
  )
  }
}