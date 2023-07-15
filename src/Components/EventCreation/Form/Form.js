import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import './Form.css';
import TextField from '@mui/material/TextField';
import Button from '../../ReusableComponents/Button/Button';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import Header from '../../ReusableComponents/Header/Header';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createEventMutation } from '../../../queries';
import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types'

const Form = ({ logoutUser, loggedInUser, userData }) => {
  const [game, setGame] = useState(null);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setEState] = useState('');
  const [zip, setZip] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [maxStartTime, setMaxStartTime] = useState(null);
  const [minEndTime, setMinEndTime] = useState(null);
  const [endTime, setEndTime] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage('');
  };

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const clearInputs = () => {
    setGame(null);
    setCategory('');
    setLocation('');
    setAddress('');
    setCity('');
    setEState('');
    setZip('');
    setDate(null);
    setStartTime(null);
    setMaxStartTime(null);
    setMinEndTime(null);
    setEndTime(null);
    setEventDescription('');
  };

  const handleError = (message) => {
    setSuccessMessage('');
    setErrorMessage(message);
  };
  const [reqCompleted, setReqCompleted] = useState(false);

  const [createEvent, { data, loading, error }] = useMutation(createEventMutation);

  const onCreateEvent = async (input) => {
    try {
      const data = await createEvent({ variables: { input } });
      handleSuccess('Your event is set, and your next adventure awaits!');
      setReqCompleted(false)
      setTimeout(() => {
        setReqCompleted(true)
        clearMessages()
        clearInputs()
      }, 4000)
    } catch (error) {
      console.log(error)
      handleError(
        'Critical fail! Your event was unable to be created, please try again!'
      );
    }
  };

  useEffect(() => {
    if (
      game &&
      category &&
      address &&
      city &&
      state &&
      zip &&
      date &&
      startTime &&
      endTime &&
      eventDescription
    ) {
      setReqCompleted(true);
    } else {
      setReqCompleted(false);
    }
  }, [
    game,
    category,
    address,
    city,
    state,
    zip,
    date,
    startTime,
    endTime,
    eventDescription,
  ]);

  const populateGameOptions = () => {
    return userData.ownedGames.map((game, i) => {
      return (
        <MenuItem key={i} value={game.id}>
          {game.name}
        </MenuItem>
      );
    });
  };

  const handleGameChange = (e) => {
    setGame(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setMinEndTime(time);
  };

  const handleEndTimeChange = (time) => {
    setMaxStartTime(time);
    setEndTime(time);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
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
      date: dayjs(date).format('YYYY/MM/DD'),
      address: address,
      city: city,
      state: state,
      zip: parseInt(zip),
      title: location,
      description: eventDescription,
      host: loggedInUser,
      game: parseInt(game),
      gameType: category,
      startTime: dayjs(startTime).format('HH:mm:ss'),
      endTime: dayjs(endTime).format('HH:mm:ss'),
    };
    console.log(newEvent)
    onCreateEvent(newEvent);
  };

  return (
    <div>
      <Header logoutUser={logoutUser} />
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
              sx={{ margin: '1em' }}
              helperText="Please select a game"
            >
              {populateGameOptions()}
            </TextField>
            <TextField
              id="category"
              value={category}
              select
              onChange={(e) => handleCategoryChange(e)}
              label="Category"
              sx={{ margin: '1em' }}
              helperText="Please select a category"
            >
              <MenuItem value={'Card Game'}>{'Card Game'}</MenuItem>
              <MenuItem value={'Fantasy'}>{'Fantasy'}</MenuItem>
              <MenuItem value={'Sci-Fi'}>{'Sci-Fi'}</MenuItem>
              <MenuItem value={'City Builder'}>{'City Builder'}</MenuItem>
              <MenuItem value={'Medieval'}>{'Medieval'}</MenuItem>
              <MenuItem value={'Adventure'}>{'Adventure'}</MenuItem>
              <MenuItem value={'Fighting'}>{'Fighting'}</MenuItem>
              <MenuItem value={'Territory Building'}>
                {'Territory Building'}
              </MenuItem>
              <MenuItem value={'Party Game'}>{'Party Game'}</MenuItem>
              <MenuItem value={'Ancient'}>{'Ancient'}</MenuItem>
              <MenuItem value={'Bluffing'}>{'Bluffing'}</MenuItem>
              <MenuItem value={'Mythology'}>{'Mythology'}</MenuItem>
              <MenuItem value={'Deduction'}>{'Deduction'}</MenuItem>
              <MenuItem value={'Puzzle'}>{'Puzzle'}</MenuItem>
              <MenuItem value={'Dice'}>{'Dice'}</MenuItem>
              <MenuItem value={'Resource Management'}>
                {'Resource Management'}
              </MenuItem>
              <MenuItem value={'Exploration'}>{'Exploration'}</MenuItem>
              <MenuItem value={'Cooperative'}>{'Cooperative'}</MenuItem>
            </TextField>
          </div>
          <h2 className="form-header">Location</h2>
          <hr className="line" />
          <div className="location-details">
          <TextField
              required
              onChange={(e) => handleLocationChange(e)}
              id="location"
              value={location}
              label="Location"
              sx={{ margin: '1em' }}
            />
            <TextField
              required
              onChange={(e) => handleAddressChange(e)}
              id="address"
              value={address}
              label="Address"
              sx={{ margin: '1em' }}
            />
            <TextField
              required
              onChange={(e) => handleCityChange(e)}
              id="city"
              value={city}
              label="City"
              sx={{ margin: '1em' }}
            />
            <TextField
              required
              onChange={(e) => handleStateChange(e)}
              id="state"
              value={state}
              label="State"
              sx={{ margin: '1em' }}
            />
            <TextField
              required
              onChange={(e) => handleZipChange(e)}
              id="zip"
              value={zip}
              label="Zip Code"
              sx={{ margin: '1em' }}
            />
            <h2 className="form-header">Date and Time</h2>
            <hr className="line" />
            <div className="event-time-and-date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  required
                  minDate={dayjs()}
                  value={date}
                  sx={{ margin: '1em' }}
                  onChange={(date) => handleDateChange(date)}
                />

                <TimePicker
                  label="Start Time"
                  required
                  value={startTime}
                  maxTime={maxStartTime}
                  sx={{ margin: '1em' }}
                  onChange={(startTime) => handleStartTimeChange(startTime)}
                />
                <TimePicker
                  label="End Time"
                  required
                  value={endTime}
                  minTime={minEndTime}
                  sx={{ margin: '1em' }}
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
              label="Event Details (max 500 characters)"
              multiline
              value={eventDescription}
              rows={6}
              sx={{
                margin: '1em',
                width: '98%',
              }}
              inputProps={{
                maxLength: 500,
              }}
              onChange={(e) => handleEventDescriptionChange(e)}
            />
          </div>
          <Tooltip
            title={!reqCompleted ? 'Please fill out all fields!' : ''}
            placement="top"
          >
            <span className="button-container">
              <Button
                className="form-button"
                text="Submit"
                onClick={handleSubmit}
                disabled={!reqCompleted}
              />
            </span>
          </Tooltip>
          <div className="message-wrapper">
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

Form.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  loggedInUser: PropTypes.number.isRequired,
  userData: PropTypes.object.isRequired,
};