import React, { useContext } from 'react';
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
      <a href={`/apps/wishlist/${props.user._id}`}>Wish list</a>
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

  return (
    <div>
      <nav className={drawerClasses}>
        <div className="btn-container">
          <CloseBtn click={props.click} />
        </div>
        <ul>
          {welcomeMsg}
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/apps/new">Add app</a>
          </li>
          <li>
            {wishListAButton}
          </li>
          <li>
            <a href="/about">
              About
            </a>
          </li>
          {props.user
            ? (
              <li>
                <button onClick={handleLogOut}>Log out</button>
              </li>
            )
            : (
              <li>
                <a href="/signup" className="sidebar-a-btn">
                  Sign up
                </a>
              </li>
            )}
        </ul>
      </nav>
      {backdrop}
    </div>
  );
};

export default SideDrawer;
