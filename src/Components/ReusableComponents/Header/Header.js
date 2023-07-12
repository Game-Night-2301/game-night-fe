import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/Dice.svg';
import usericon from '../../../assets/usericon.svg';
import DropDown from '../DropDown/DropDown';

const Header = ({ logoutUser }) => {
  const menuItems = [
    {
      label: 'Profile',
      link: '/profile',
      handler: () => {
      }
    },
    {
      label: 'Logout',
      link: '/',
      handler: () => {
        logoutUser();
      }
    }
  ];

  const renderDropDownTrigger = (handleOpenMenu) => (
    <img src={usericon} alt="User Icon" className="profile-link" onClick={handleOpenMenu} />
  );

  return (
    <header className="header">
      <NavLink to="/browse" className="header-nav-link">
        <img src={logo} alt="Game Night Logo" className="logo" />
      </NavLink>
      <nav className="button-group">
        <NavLink to="/create" className="header-nav-link">Create Event</NavLink>
      </nav>
      <DropDown menuItems={menuItems} renderTrigger={renderDropDownTrigger} />
    </header>
  );
};

export default Header;
