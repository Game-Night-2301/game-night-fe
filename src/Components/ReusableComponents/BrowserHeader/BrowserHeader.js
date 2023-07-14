import React from 'react';
import './BrowserHeader.css';

const BrowserHeader = ({ text, nomargin }) => {
  return (
    <>
      <h5 className={`browser-header-title ${nomargin ? 'browser-header-no-margin' : ''}`}>{text}</h5>
    </>
  );
};

export default BrowserHeader;
