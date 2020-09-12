import React from "react";
import "./CloseBtn.css"

const closeBtn = (props) => (
    <div className="close-icon" onClick={props.click}/>
)

export default closeBtn;