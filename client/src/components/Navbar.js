import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

import DrawerToggleBtn from './DrawerToggleBtn';
import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import { OpenStockLogoIcon } from '../images';
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
        console.log(error.message);
      });
  };

  return (
    <nav>
      <div className="navbar-toggle-btn">
        <DrawerToggleBtn onClick={handleDrawerToggleClick} />
      </div>

      <div id="logoHome">
        <Link to="/">
          <img src={OpenStockLogoIcon} alt="logo_openStock" />
        </Link>
      </div>

      <div className="navbar-wrapper">
        {user && (
        <p>
          Hi,
          {' '}
          {user.username}
        </p>
        )}
        <Link to="/about" className="navbar-texts">
          About
        </Link>
        <Link to="/apps/new" className="navbar-texts">
          <span>＋</span>
          {' '}
          Add app
        </Link>
        { user ? (
          // Fragement to group children without adding extra nodes to the DOM
          <>
            <Link to={`/apps/wishlist/${user._id}`} className="navbar-texts">
              Wish list
            </Link>
            <button type="button" onClick={handleLogOut} className="navbar-btn">
              Log out
            </button>
          </>
        ) : (
          <>
            <button type="button" className="navbar-texts button-link" onClick={() => openDialog('Log in to create a wish list.')}>
              Wish list
            </button>
            <Link to="/login" className="aButton navbar-texts">
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
  }),
  handleDrawerToggleClick: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: {},
};

export default Navbar;
