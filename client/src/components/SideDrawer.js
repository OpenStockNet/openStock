import React from "react";
import "./SideDrawer.css"
import { logout } from "../services/auth";

const sideDrawer = (props) => {
    //add css anmiation
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
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
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <a href="/apps/new">Add new app</a> 
                </li>
                <li>
                    <a href="/">Wish list</a> 
                </li>
                <button onClick={handleLogOut}>Log out</button>
            </ul>
        </nav>
    )
};


export default sideDrawer;
