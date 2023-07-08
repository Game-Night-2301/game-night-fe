import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="link">
        <h1 className="logo">Logo</h1>
      </Link>
      <nav className="button-group">
        <NavLink to="/Profile" className="nav-link">Profile</NavLink>
        <NavLink to="/Groups" className="nav-link">Groups</NavLink>
        <NavLink to="/Collection" className="nav-link">Game Collection</NavLink>
        <NavLink to="/Create" className="nav-link">Create</NavLink>
      </nav>
      <div></div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  siteTitle: PropTypes.string,
}