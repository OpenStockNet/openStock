import React from "react";
import "./SideDrawer.css"

const sideDrawer = (props) => (
    <nav className="side-drawer">
        <ul>
            <li><a href="/apps/new">Add new app</a> </li>
            <li><a href="/">Wish list</a> </li>
        </ul>
    </nav>
);


export default sideDrawer;
