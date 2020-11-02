import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

import DrawerToggleBtn from './DrawerToggleBtn';

import './Navbar.scss';

const Navbar = (props) => {
  // window.location redirects user back to homepage and reload the page
  const handleLogOut = () => {
    logout()
      .then(() => {
        window.location = '/';
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loggedInContent = (
    props.user && (
    <div className="loggedUser">
      <p>
        Hi
        {' '}
        <b>{props.user.username}</b>
      </p>
      <Link to="/about" className="nav-bar-texts">
        About
      </Link>
      <Link to="/apps/new" className="nav-bar-texts">
        <span>＋</span>
        {' '}
        Add app
      </Link>
      <Link to={`/apps/wishlist/${props.user._id}`} className="nav-bar-texts">
        Wish list
      </Link>
      <button onClick={handleLogOut}>Log out</button>
    </div>
    )
  );

  const loggedOutContent = (
    <div>
      <Link to="/login" className="aButton">
        Log in
      </Link>
      {/* <Link to="/signup" className="aButton">
        Sign up
      </Link> */}
    </div>
  );

  const drawerToggleBtn = (
    props.user
      && (
      <div className="navbar-toggle-btn">
        <DrawerToggleBtn click={props.handleDrawerToggleClick} />
      </div>
      )
  );

  return (
    <nav className="navbar">
      {drawerToggleBtn}
      <div id="logoHome">
        <Link to="/">
          <img src="https://res.cloudinary.com/dt9v4wqeu/image/upload/v1590001345/openstock/logoOpenstock.svg" alt="" />
        </Link>
        {/* <Link to="/alternatives">Alternatives to</Link> */}
      </div>
      {props.user ? loggedInContent : loggedOutContent}
    </nav>
  );
};

export default Navbar;
