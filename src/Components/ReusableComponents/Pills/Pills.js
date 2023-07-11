import React from 'react';
import './Pills.css';

const Pills = ({tags}) => {
  const pills = tags.map((tag, index) => (
    <div key={index} className={`pill ${tag.label ? '' : 'highlight'}`}>
      <p className="pill-text">{tag.label ? `${tag.value} ${tag.label}` : tag.value}</p>
    </div>
  ));
  

  return (
    <>
      {pills}
    </>
  )
}

export default Pills;
