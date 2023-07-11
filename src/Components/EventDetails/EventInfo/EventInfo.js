import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import Button from '../../ReusableComponents/Button/Button'
import './EventInfo.css';

export const EventInfo = ({ hostId, id, game, time, date, attendees, host}) => {


  const isAttending = attendees.includes(attendees.id)
  // const isHost = host === user.id

  const renderRolePill = () => {
  
      // if (isHost) {
      //   <Pills content='Host' />
      // }
      if (isAttending) {
        <Pills content='Attending' />
      } 
    }

  const renderButton = () => {
    // if(isHost) {
    //   <Button content='Host Actions'/>
    // }
    if (!attendees.includes(attendees.id)) {
      <Button content='Join'/>
    }
  }

  return (
    <div>
        <h1 className='event-title'>{game}</h1>
        <h2 className='event-date'>{date}</h2>
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