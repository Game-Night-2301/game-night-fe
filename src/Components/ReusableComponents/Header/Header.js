import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/Logo.svg';
import usericon from '../../../assets/usericon.svg';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Header = ({ logoutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push('/profile');
    handleCloseMenu();
  };

  const handleLogout = () => {
    logoutUser(); 
    history.push('/');
    handleCloseMenu();
  };

  return (
    <header className="header">
      <NavLink to="/browse" className="header-nav-link">
        <img src={logo} alt="Game Night Logo" className="logo" />
      </NavLink>
      <nav className="button-group">
        <NavLink to="/create" className="header-nav-link">
          Create
        </NavLink>
      </nav>
      <div>
        <IconButton onClick={handleOpenMenu} color="inherit">
          <img src={usericon} alt="User Icon" className="profile-link" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
