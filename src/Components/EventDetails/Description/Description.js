import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Description.css';
import marker from '../../../assets/marker.png';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Description = ({
  gameDescription,
  description,
  lat,
  lon,
  address,
  city,
  state,
  zip,
}) => {
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(gameDescription, 'text/html');
  const parsedText = htmlDocument.body.textContent;

  const customMarker = L.icon({
    iconUrl: marker,
    iconSize: [40, 50],
    iconAnchor: [20, 25],
  });

  return (
    <div className="description-wrapper">
      <h4 className="description-header">Event Information</h4>
      <hr className="description-line" />
      <Accordion className="custom-accordion" sx={{ background: 'transparent' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="description-drop-down">Host Message</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="description-text">{description}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="custom-accordion" sx={{ background: 'transparent', overflow: "auto" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="description-drop-down">Game Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="scroll-wrapper">
            <Typography className="description-text">{parsedText}</Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="custom-accordion" sx={{ background: 'transparent' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="description-drop-down">Event Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="description-text">
            Address: {address}, {city}, {state}. {zip}
          </Typography>
          <div className="map-box">
            <MapContainer
              center={[lat, lon]}
              zoom={13}
              style={{ height: '30em', width: '90%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <Marker position={[lat, lon]} icon={customMarker} />
            </MapContainer>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

Description.propTypes = {
  description: PropTypes.string.isRequired,
};
