import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/Logo.svg';
import usericon from '../../../assets/usericon.svg';

const Header = ({logoutUser}) => {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className="header">
      <NavLink to="/browse" className="header-nav-link">
        <img src={logo} alt="Game Night Logo" className="logo" />
      </NavLink>
      <nav className="button-group">
        <NavLink to="/Groups" className="header-nav-link">Groups</NavLink>
        <NavLink to="/Collection" className="header-nav-link">Game Collection</NavLink>
        <NavLink to="/Create" className="header-nav-link">Create</NavLink>
        <NavLink to="/" className="header-nav-link" onClick={handleLogout}>Logout</NavLink>
      </nav>
      <NavLink to="/Profile" className="header-nav-link">
        <img src={usericon} alt="User Icon" className='profile-link' />
      </NavLink>
    </header>
  );
};

export default Header;