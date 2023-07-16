import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/Dice.svg';
import usericon from '../../../assets/usericon.svg';
import DropDown from '../DropDown/DropDown';
import PropTypes from 'prop-types'

const Header = ({ logoutUser }) => {
  const menuItems = [
    {
      label: 'Create Event',
      link: '/create',
      handler: () => {},
    },
    {
      label: 'Profile',
      link: '/profile',
      handler: () => {},
    },
    {
      label: 'Recommendations',
      link: '/recommendations',
    },
    {
      label: 'Logout',
      link: '/',
      handler: () => {
        logoutUser();
      },
    },
  ];

  const renderDropDownTrigger = (handleOpenMenu) => (
    <img
      src={usericon}
      alt="User Icon"
      className="profile-link"
      onClick={handleOpenMenu}
    />
  );

  return (
    <header className="header">
      <NavLink to="/browse" className="browse-link">
        <img src={logo} alt="Game Night Logo" className="logo" />
      </NavLink>
      <div className="user-container">
        <DropDown menuItems={menuItems} renderTrigger={renderDropDownTrigger} />
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};