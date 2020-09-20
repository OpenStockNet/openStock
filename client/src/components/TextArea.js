// import React from "react";
import React, { useState, useEffect } from "react";
import "./TextArea.css";

const TextArea = (props) => {
    const [comments, setComments] = useState("");

    const handleChange = (event) => {    
        setComments(event.target.value);  
    }

    const handleTextsSubmit = (event) => {
        alert(`Thank you for reviewing ${props.app.name}.`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleTextsSubmit} className="text-area">
            <label>Reveiws</label>
            <textarea value={comments} onChange={handleChange} className="comment-text-area">
                How do you like this app? 
            </textarea> 
            <input type="submit" value="Submit" />
        </form>
    )
}

export default TextArea;