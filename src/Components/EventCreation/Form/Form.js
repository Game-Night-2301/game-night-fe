import React, { useState, useEffect } from "react";
// import { createEvent } from '../../queries/index'
import "./Form.css";
import TextField from "@mui/material/TextField";
import Button from "../../ReusableComponents/Button/Button";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Form = () => {
  const [game, setGame] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = {

    // };

    // useEffect(() => {

    // })
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="container">
        <h2 className="form-header">Game</h2>
        <hr className="line" />
        <div className="game-details">
          <TextField
            className="game-selector"
            id="game"
            value={game}
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
            onChange={(e) => setCity(e.target.value)}
            id="address"
            value={address}
            label="Address"
            sx={{margin: "1em"}}
          />
          {/* <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
          <TextField
            required
            onChange={(e) => setCity(e.target.value)}
            id="city"
            value={city}
            label="City"
            sx={{margin: "1em"}}
          />
          {/* <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} /> */}
          <TextField
            required
            onChange={(e) => setState(e.target.value)}
            id="state"
            value={state}
            label="State"
            sx={{margin: "1em"}}
          />
          {/* <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} /> */}
          <TextField
            required
            onChange={(e) => setZip(e.target.value)}
            id="zip"
            value={zip}
            label="Zip Code"
            sx={{margin: "1em"}}
          />
          {/* <label htmlFor="zip">Zip:</label>
          <input type="text" id="zip" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} /> */}
          {/* <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          /> */}
          <h2 className="form-header">Date and Time</h2>
          <hr className="line" />
          <div className="event-time-and-date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date}
                sx={{margin: "1em"}}
                onChange={(newDate) => setDate(newDate)}
              />

              <TimePicker
                label="Start Time"
                value={startTime}
                sx={{margin: "1em"}}
                onChange={(newTime) => setStartTime(newTime)}
              />
              <TimePicker
                label="End Time"
                value={endTime}
                sx={{margin: "1em"}}
                onChange={(newTime) => setEndTime(newTime)}
              />
            </LocalizationProvider>
          </div>

          {/* <label htmlFor="start-time">Start Time:</label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label htmlFor="end-time">End Time:</label>
          <input
            type="time"
            id="end-time"
            name="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          /> */}
        </div>
        <h2 className="form-header">Event Details</h2>
        <hr className="line" />
        <div className="event-details">
          <TextField
            id="outlined-multiline-static"
            label="Details"
            multiline
            rows={6}
            sx={{margin: "1em",
            width: "98%"}}
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
