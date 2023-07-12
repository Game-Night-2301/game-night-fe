import React, { useState, useEffect } from 'react';
// import { createEvent } from '../../queries/index'
import './Form.css';
import TextField from '@mui/material/TextField';
import Button from '../../ReusableComponents/Button/Button';
import MenuItem from '@mui/material/MenuItem';


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
        <TextField
id="games"
select
label="Games"
helperText="Please select a game"
>
<MenuItem value={"Game 1"}>
{"Game 1"}
</MenuItem>
<MenuItem value={"Game 2"}>
{"Game 2"}
</MenuItem>
<MenuItem value={"Game 3"}>
{"Game 3"}
</MenuItem>
</TextField>
<TextField
      id="category"
      select
      label="Category"
      helperText="Please select a category"
    >
        <MenuItem value={"Category 1"}>
          {"Category 1"}
        </MenuItem>
        <MenuItem value={"Category 2"}>
          {"Category 2"}
        </MenuItem>
        <MenuItem value={"Category 3"}>
          {"Category 3"}
        </MenuItem>
    </TextField>
        </div>
        <h2>Location</h2>
        <div className="location-details">
        <TextField
      required
      onChange={(e) => setCity(e.target.value)}
      id="address"
      label="Address"
    />
          {/* <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
          <TextField
      required
      onChange={(e) => setCity(e.target.value)}
      id="city"
      label="City"
    />
          {/* <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} /> */}
          <TextField
      required
      onChange={(e) => setState(e.target.value)}
      id="state"
      label="State"
    />
          {/* <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} /> */}
          <TextField
      required
      onChange={(e) => setZip(e.target.value)}
      id="zip"
      label="Zip Code"
    />
          {/* <label htmlFor="zip">Zip:</label>
          <input type="text" id="zip" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} /> */}
                <TextField
      required
      onChange={(e) => setDate(e.target.value)}
      id="city"
      label="City"
    />
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
    
          <label htmlFor="start-time">Start Time:</label>
          <input type="time" id="start-time" name="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <label htmlFor="end-time">End Time:</label>
          <input type="time" id="end-time" name="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <h2>Event Details</h2>
        <div className="event-details">
        <TextField
      id="outlined-multiline-static"
      label="Details"
      multiline
      rows={6}
      onChange={(e) => setEventDescription(e.target.value)}
    />
          {/* <textarea
            id="eventDescription"
            name="event-description"
            rows="4"
            cols="50"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          /> */}
        </div>
        <Button text="Submit" />
      </div>
    </form>
  );
};

export default Form;