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
      <NavLink to="/browse" className="link">
        <img src={logo} alt="Game Night Logo" className="logo" />
      </NavLink>
      <nav className="button-group">
        <NavLink to="/Groups" className="nav-link">Groups</NavLink>
        <NavLink to="/Collection" className="nav-link">Game Collection</NavLink>
        <NavLink to="/Create" className="nav-link">Create</NavLink>
        <NavLink to="/" className="nav-link" onClick={handleLogout}>Logout</NavLink>
      </nav>
      <NavLink to="/Profile" className="nav-link">
        <img src={usericon} alt="User Icon" className='profile-link' />
      </NavLink>
    </header>
  );
};

export default Header;