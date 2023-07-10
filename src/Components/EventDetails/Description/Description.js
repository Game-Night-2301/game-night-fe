import React from 'react';
import PropTypes from 'prop-types';
import './Description.css';

export const Description = ( { description } ) => {
  return (
    <div>
      <h4>Description</h4>
      <p>{description}</p>
    </div>
  )
}