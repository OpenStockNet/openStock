import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

import CloseBtn from './CloseBtn';
import Backdrop from './Backdrop';
import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './SideDrawer.scss';

const SideDrawer = (props) => {
  // add css anmiation
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  let backdrop;
  if (props.show) {
    backdrop = <Backdrop />;
  }

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  const wishListAButton = (
    props.user ? (
      <Link to={`/apps/wishlist/${props.user._id}`} onClick={props.click}>Wish list</Link>
    ) : (
      <button onClick={() => openDialog('Log in to create a wish list.')} className="sidebar-btn-link">
        Wish list
      </button>
    )
  );

  const welcomeMsg = (
    props.user && (
      <li className="user-name">
        Hi,
        {' '}
        {props.user.username}
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
        alert(error.message);
      });
  };
  // a link reloads once clicked on, react Link naviagate internally in app.
  // that's why each time Link has onClick to close sidedrawer
  // a: externally; Link internally
  return (
    <div>
      <nav className={drawerClasses}>
        <div className="btn-container">
          <CloseBtn click={props.click} />
        </div>
        <ul>
          {welcomeMsg}
          <li>
            <Link to="/" onClick={props.click}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/apps/new" onClick={props.click}>
              Add app
            </Link>
          </li>
          <li>
            {wishListAButton}
          </li>
          <li>
            <Link to="/about" onClick={props.click}>
              About
            </Link>
          </li>
          {props.user
            ? (
              <li>
                <button onClick={handleLogOut}>Log out</button>
              </li>
            )
            : (
              <li>
                <Link to="/signup" className="sidebar-a-btn" onClick={props.click}>
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

export default SideDrawer;
