import React from 'react';
import { logout } from '../services/auth';

import CloseBtn from './CloseBtn';
import Backdrop from './Backdrop';

import './SideDrawer.scss';

const sideDrawer = (props) => {
  // add css anmiation
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  let backdrop;
  if (props.show) {
    backdrop = <Backdrop />;
  }

  const handleLogOut = () => {
    logout()
      .then(() => {
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
            <a href="/apps/new">Add new app</a>
          </li>
          <li>
            <a href={`/apps/wishlist/${props.user._id}`}>Wish list</a>
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

export default sideDrawer;
