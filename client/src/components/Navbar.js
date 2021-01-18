import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

import DrawerToggleBtn from './DrawerToggleBtn';
import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './Navbar.scss';

const Navbar = ({ user, handleDrawerToggleClick }) => {
  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);
  // window.location redirects user back to homepage and reload the page
  const handleLogOut = () => {
    logout()
      .then(() => {
        openSnackbar('See you next time!');
        window.location = '/';
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logInlogOutBtn = (
    user ? (
      <button onClick={handleLogOut} className='nav-bar-btn'>Log out</button>
    ) : (
      <Link to="/login" className="aButton nav-bar-texts">
        Log in
      </Link>
    )
  );

  const wishListAButton = (
    user ? (
      <Link to={`/apps/wishlist/${user._id}`} className="nav-bar-texts">
        Wish list
      </Link>
    ) : (
      <button className="nav-bar-texts button-link" onClick={() => openDialog('Log in to create a wish list.')}>
        Wish list
      </button>
    )
  );

  const loginContent = (
    <div className="loggedUser">
      <p>
        Hi,
        {' '}
        {user.username}
      </p>
      <Link to="/about" className="nav-bar-texts">
        About
      </Link>
      <Link to="/apps/new" className="nav-bar-texts">
        <span>＋</span>
        {' '}
        Add app
      </Link>
      {wishListAButton}
      {logInlogOutBtn}
    </div>
  );

  const logoutContent = (
    <div className="logout-content">
      <div className="loggedUser">
        <Link to="/about" className="nav-bar-texts">
          About
        </Link>
        <Link to="/apps/new" className="nav-bar-texts">
          <span>＋</span>
          {' '}
          Add app
        </Link>
        {wishListAButton}
      </div>
      {logInlogOutBtn}
    </div>
  );

  const drawerToggleBtn = (
    <div className="navbar-toggle-btn">
      <DrawerToggleBtn click={handleDrawerToggleClick} />
    </div>
  );

  return (
    <nav className="navbar">
      {drawerToggleBtn}
      <div id="logoHome">
        <Link to="/">
          <img src="https://res.cloudinary.com/dt9v4wqeu/image/upload/v1590001345/openstock/logoOpenstock.svg" alt="" />
        </Link>
      </div>
      {user ? loginContent : logoutContent}
    </nav>
  );
};

Navbar.propTypes = {
  // unloggedin user emptry string, loggedin user object
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  handleDrawerToggleClick: PropTypes.func.isRequired,
};

export default Navbar;
