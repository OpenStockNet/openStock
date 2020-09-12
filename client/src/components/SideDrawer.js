import React from "react";
import "./SideDrawer.css"
import { logout } from "../services/auth";

import CloseBtn from "./CloseBtn";
import Backdrop from "./Backdrop"; 

const sideDrawer = (props) => {

    //add css anmiation
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

<<<<<<< HEAD

    let backdrop;
    if (props.show) {
      backdrop = <Backdrop />
=======
    
    let backdrop;
    if (props.show) {
      backdrop = <Backdrop click={props.click}/>
>>>>>>> c47706f5a7311381c60e597119f4f276b11cd4cb
    }

    const handleLogOut = () => {
        logout()
          .then(() => {
            window.location = "/";
          })
          .catch((error) => {
            alert(error.message);
          });
      };

    return (
        <div>
        <nav className={drawerClasses}>
            <ul>
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
<<<<<<< HEAD
            <CloseBtn click={props.click}/>
=======
            <CloseBtn/>
            {backdrop}
>>>>>>> c47706f5a7311381c60e597119f4f276b11cd4cb
        </nav>
        {backdrop}
        </div>
    )
};


export default sideDrawer;
