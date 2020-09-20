import React, { useState } from "react";
import { addReview } from "../services/review";
import "./TextArea.css";

const TextArea = (props) => {
    const [comments, setComments] = useState("How do you like this app?");
    const appId = props.appId;
    const userId = props.userId;

    function handleChange (event) {    
        setComments(event.target.value);  
    }

    function handleSubmit (event) {
        event.preventDefault(); // stops default reloading behaviour
        const value = comments; 
        // const value = event.target.value; //not working, as event has two targets input and btn, need to write target[0] to specify

        addReview(value, appId, userId)
            .then(() => {
                alert(`Thank you for reviewing ${props.app.name}.`);
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="text-area">
            <label>Reviews</label>
            <input
                type="text"
                name="comments"
                value={comments} 
                onChange={handleChange} 
                className="comment-text-area" 
            />
            <button type="submit" >submit</button>
        </form>
           
      
    )
}

export default TextArea;