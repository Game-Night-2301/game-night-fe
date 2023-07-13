import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import "./Form.css";
import TextField from "@mui/material/TextField";
import Button from "../../ReusableComponents/Button/Button";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createEventMutation } from "../../../queries";

const Form = ({logoutUser, loggedInUser}) => {
  const [game, setGame] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setEState] = useState('');
  const [zip, setZip] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventDescription, setEventDescription] = useState('');

  const [createEvent, { data, loading, error }] = useMutation(createEventMutation);

  const onCreateEvent = async(input) => {
    try {
      const { data } = await createEvent({ variables: { input } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleGameChange = (e) => {
    setGame(e.target.value);
  };
  
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setEState(e.target.value);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleSubmit = () => {
    const newEvent = {
      date: dayjs(date).format("YYYY/MM/DD"),
      address: address,
      city: city,
      state: state,
      zip: parseInt(zip),
      title: game,
      description: eventDescription,
      host: loggedInUser,
      game: 1,
      gameType: category,
      startTime: dayjs(startTime).format("HH:mm:ss"),
      endTime: dayjs(endTime).format("HH:mm:ss"),
    }    
    console.log(newEvent)
    onCreateEvent(newEvent);
  };

  return (
    <form className="form">
      <div className="container">
        <h2 className="form-header">Game</h2>
        <hr className="line" />
        <div className="game-details">
          <TextField
            className="game-selector"
            id="game"
            value={game}
            onChange={(e) => handleGameChange(e)}
            select
            label="Games"
            sx={{margin: "1em"}}
            helperText="Please select a game"
          >
            <MenuItem value={"Game 1"}>{"Game 1"}</MenuItem>
            <MenuItem value={"Game 2"}>{"Game 2"}</MenuItem>
            <MenuItem value={"Game 3"}>{"Game 3"}</MenuItem>
          </TextField>
          <TextField
            id="category"
            value={category}
            select
            onChange={(e) => handleCategoryChange(e)}
            label="Category"
            sx={{margin: "1em"}}
            helperText="Please select a category"
          >
            <MenuItem value={"Category 1"}>{"Category 1"}</MenuItem>
            <MenuItem value={"Category 2"}>{"Category 2"}</MenuItem>
            <MenuItem value={"Category 3"}>{"Category 3"}</MenuItem>
          </TextField>
        </div>
        <h2 className="form-header">Location</h2>
        <hr className="line" />
        <div className="location-details">
          <TextField
            required
            onChange={(e) => handleAddressChange(e)}
            id="address"
            value={address}
            label="Address"
            sx={{margin: "1em"}}
          />
          <TextField
            required
            onChange={(e) => handleCityChange(e)}
            id="city"
            value={city}
            label="City"
            sx={{margin: "1em"}}
          />
          <TextField
            required
            onChange={(e) => handleStateChange(e)}
            id="state"
            value={state}
            label="State"
            sx={{margin: "1em"}}
          />
          <TextField
            required
            onChange={(e) => handleZipChange(e)}
            id="zip"
            value={zip}
            label="Zip Code"
            sx={{margin: "1em"}}
          />
          <h2 className="form-header">Date and Time</h2>
          <hr className="line" />
          <div className="event-time-and-date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
            required
                value={date}
                sx={{margin: "1em"}}
                onChange={(newDate) => handleDateChange(newDate)}
              />

              <TimePicker
                label="Start Time"
            required
                value={startTime}
                sx={{margin: "1em"}}
                onChange={(startTime) => handleStartTimeChange(startTime)}
              />
              <TimePicker
                label="End Time"
            required
                value={endTime}
                sx={{margin: "1em"}}
                onChange={(endTime) => handleEndTimeChange(endTime)}
              />
            </LocalizationProvider>
          </div>
        </div>
        <h2 className="form-header">Event Details</h2>
        <hr className="line" />
        <div className="event-details">
          <TextField
            id="outlined-multiline-static"
            label="Details"
            multiline
            value={eventDescription}
            rows={6}
            sx={{margin: "1em",
            width: "98%"}}
            onChange={(e) => handleEventDescriptionChange(e)}
          />
        </div>
        <Button className="button" text="Submit" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default Form;
