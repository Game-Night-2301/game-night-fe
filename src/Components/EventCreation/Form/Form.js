import React from 'react';
import './Form.css'

const Form = () => {
  return (
    <form>
      <div className="container">
        <h2>Game</h2>
        <div className="gameDetails">
          <label htmlFor="game">Game:</label>
          <select id="game" name="game">
            <option value="game1">Game 1</option>
            <option value="game2">Game 2</option>
            <option value="game3">Game 3</option>
          </select>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category">
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        <h2>Location</h2>
        <div className="locationDetails">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" />
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" />
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" />
          <label htmlFor="zip">Zip:</label>
          <input type="text" id="zip" name="zip" />
          <label htmlFor="start-time">Start Time:</label>
          <input type="time" id="start-time" name="start-time" />
          <label htmlFor="end-time">End Time:</label>
          <input type="time" id="end-time" name="end-time" />
        </div>
        <h2>Event Details</h2>
        <div className="eventDetails">
          <textarea id="eventDescription" name="eventDescription" rows="4" cols="50" />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;