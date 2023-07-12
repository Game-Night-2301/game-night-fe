import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import './DropDown.css'

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


