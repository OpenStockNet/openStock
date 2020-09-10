import React from "react";

import "./DrawerToggleBtn.css";

const drawerToggleBtn = (props) => (
    <button className="toggle-btn" onClick={props.click}>
        <div className="toggle-btn-line"/>
        <div className="toggle-btn-line"/>
        <div className="toggle-btn-line"/>
    </button>
)
    


export default drawerToggleBtn;