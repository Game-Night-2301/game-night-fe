import React from 'react';
import PropTypes from 'prop-types';
import './Description.css';

export const Description = ( { description } ) => {
  return (
    <div className="description-wrapper">
      <h4 className="description-header">Description</h4>
      < hr className="description-line" />
      <p className="description-text">{description}</p>
    </div>
  )
}