import React, {  useContext } from 'react';
import { logout } from '../services/auth';

import CloseBtn from './CloseBtn';
import Backdrop from './Backdrop';
import SharedSnackbarContext from './SharedSnackbar.context';

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

  const handleLogOut = () => {
    logout()
      .then(() => {
        openSnackbar('See you next time!')
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
          <li className="user-name">
            Hi
            {' '}
            {props.user.username}
          </li>
          <li>
            <a href="/apps/new">Add app</a>
          </li>
          <li>
            <a href={`/apps/wishlist/${props.user._id}`}>Wish list</a>
          </li>
          <li>
            <a href="/about">
              About
            </a>
          </li>
          <li>
            <button onClick={handleLogOut}>Log out</button>
          </li>
        </ul>
      </nav>
      {backdrop}
    </div>
  );
};

export default SideDrawer;
