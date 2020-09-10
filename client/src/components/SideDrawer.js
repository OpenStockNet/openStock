import React from "react";
import "./SideDrawer.css"



const sideDrawer = (props) => {
    //add css anmiation
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li>
                    <a href="/apps/new">Add new app</a> 
                </li>
                <li>
                    <a href="/">Wish list</a> 
                </li>
            </ul>
        </nav>
    )
};


export default sideDrawer;
