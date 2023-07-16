import React from 'react';
import './Pills.css';
import PropTypes from 'prop-types'

const Pills = ({ tags }) => {
  const pills = tags.map((tag, index) => (
    <div key={index} className={`pill ${tag.label ? '' : 'highlight'}`}>
      <p className={`pill-text ${tag.className}`}>{tag.label ? `${tag.value} ${tag.label}` : tag.value}</p>
    </div>
  ));


  return (
    <>
      {pills}
    </>
  );
};

export default Pills;

Pills.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
      className: PropTypes.string
    })
  ).isRequired
};
