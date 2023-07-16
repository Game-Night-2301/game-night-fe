import React from 'react';
import './BrowserHeader.css';
import PropTypes from 'prop-types'

const BrowserHeader = ({ text, nomargin }) => {
  return (
    <>
      <h5 className={`browser-header-title ${nomargin ? 'browser-header-no-margin' : ''}`}>{text}</h5>
    </>
  );
};

export default BrowserHeader;

BrowserHeader.propTypes = {
  text: PropTypes.string.isRequired,
};