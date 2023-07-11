import React, { useState, useEffect } from 'react';
// import { createEvent } from '../../queries/index'
import './Form.css';

const Form = ({logoutUser}) => {
  const [game, setGame] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = {
 
    // };

    // useEffect(() => {

    // })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h2>Game</h2>
        <div className="game-details">
          <label htmlFor="game">Game:</label>
          <select id="game" name="game" value={game} onChange={(e) => setGame(e.target.value)}>
            <option value="game1">Game 1</option>
            <option value="game2">Game 2</option>
            <option value="game3">Game 3</option>
          </select>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        <h2>Location</h2>
        <div className="location-details">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} />
          <label htmlFor="zip">Zip:</label>
          <input type="text" id="zip" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label htmlFor="start-time">Start Time:</label>
          <input type="time" id="start-time" name="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <label htmlFor="end-time">End Time:</label>
          <input type="time" id="end-time" name="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <h2>Event Details</h2>
        <div className="event-details">
          <textarea
            id="eventDescription"
            name="event-description"
            rows="4"
            cols="50"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;