// import React from "react";
import React, { useState, useEffect } from "react";
import "./TextArea.css";

const TextArea = (props) => {
    const [app, setApp] = useState("");

    return (
        <form className="text-area">
            <label>Reveiws</label>
            <textarea className="comment-text-area">
                How do you like this app? 
            </textarea> 
            <input type="submit" value="Submit" />
        </form>
    )
}

export default TextArea;