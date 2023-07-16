import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import './DropDown.css';
import PropTypes from 'prop-types'

const DropDown = ({ menuItems, renderTrigger }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {renderTrigger(handleOpenMenu)}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.handler}>
            <Link to={item.link} className="menu-link">{item.label}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDown;

DropDown.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      handler: PropTypes.func
    })
  ).isRequired,
  renderTrigger: PropTypes.func.isRequired
};

