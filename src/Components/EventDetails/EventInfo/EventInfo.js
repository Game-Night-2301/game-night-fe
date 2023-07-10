import React from 'react';
import PropTypes from 'prop-types';
import Pills from '../../ReusableComponents/Pills/Pills';
import Button from '../..ReusableComponents/Button/Button'
import './Card.css';

export const EventInfo = () => {

  renderButton = () => {
    
  }
  
  return (
    <div>
        <h1 className='event-title'>{gameDetails.name}</h1>
        <h2 className='event-date'>{date}</h2>
        <h2 className='event-time'>{time}</h2>
        <div className='event-pill-holder'>
          {renderPills()}
        </div>
    </div>
  )

  }