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
import { createEvent } from "../../../queries";

const Form = ({logoutUser, loggedInUser}) => {
  const [game, setGame] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [eventDescription, setEventDescription] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    createNewEvent({
      variables: {
        input: {
          date: date,
          address: address,
          city: city,
          state: state,
          zip: zip,
          title: game,
          description: eventDescription,
          hostId: loggedInUser,
        },
      },
    });
  };
  const [createNewEvent, { data: data, loading: loading, error: error }] = useMutation(createEvent);

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
            onChange={(e) => setGame(e.target.value)}
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
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            value={address}
            label="Address"
            sx={{margin: "1em"}}
          />
          <TextField
            required
            onChange={(e) => setCity(e.target.value)}
            id="city"
            value={city}
            label="City"
            sx={{margin: "1em"}}
          />
          <TextField
            required
            onChange={(e) => setState(e.target.value)}
            id="state"
            value={state}
            label="State"
            sx={{margin: "1em"}}
          />
          <TextField
            required
            onChange={(e) => setZip(e.target.value)}
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
                onChange={(newDate) => setDate(newDate)}
              />

              <TimePicker
                label="Start Time"
            required
                value={startTime}
                sx={{margin: "1em"}}
                onChange={(newTime) => setStartTime(newTime)}
              />
              <TimePicker
                label="End Time"
            required
                value={endTime}
                sx={{margin: "1em"}}
                onChange={(newTime) => setEndTime(newTime)}
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
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <Button className="button" text="Submit" onClick={()=>{createNewEvent({variables: {input: { 
        date: date,
        address: address,
        state: state,
        city: city,
        zip: zip,
        title: game,
        cancelled: false,
        description: eventDescription,
        hostId: loggedInUser,
        }}})}}/>
      </div>
    </form>
  );
};

export default Form;
