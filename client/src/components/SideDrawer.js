import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

import CloseBtn from './CloseBtn';
import Backdrop from './Backdrop';
import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './SideDrawer.scss';

const SideDrawer = ({ user, show, onClick }) => {
  let drawerClasses;
  show ? drawerClasses = 'side-drawer open' : drawerClasses = 'side-drawer';

  let backdrop;
  show && (backdrop = <Backdrop />);

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  const wishListAButton = (
    user ? (
      <Link to={`/apps/wishlist/${user._id}`} onClick={onClick}>Wish list</Link>
    ) : (
      <button onClick={() => openDialog('Log in to create a wish list.')} className="sidebar-btn-link">
        Wish list
      </button>
    )
  );

  const welcomeMsg = (
    user && (
      <li className="user-name">
        Hi,
        {' '}
        {user.username}
      </li>
    )
  );

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

  // a link: nav externally, reloads once clicked;
  // react Link: nav internally in app
  return (
    <div>
      <nav className={drawerClasses}>
        <div className="btn-container">
          <CloseBtn onClick={onClick} />
        </div>
        <ul>
          {welcomeMsg}
          <li>
            <Link to="/" onClick={onClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/apps/new" onClick={onClick}>
              Add app
            </Link>
          </li>
          <li>
            {wishListAButton}
          </li>
          <li>
            <Link to="/about" onClick={onClick}>
              About
            </Link>
          </li>
          {user
            ? (
              <li>
                <button onClick={handleLogOut}>Log out</button>
              </li>
            )
            : (
              <li>
                <Link to="/signup" className="sidebar-a-btn" onClick={onClick}>
                  Sign up
                </Link>
              </li>
            )}
        </ul>
      </nav>
      {backdrop}
    </div>
  );
};

SideDrawer.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SideDrawer;
