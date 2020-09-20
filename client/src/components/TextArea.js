import React, { useState, useEffect } from "react";
import { addReview, fetchReviews } from "../services/review";
import "./TextArea.css";

const TextArea = (props) => {
    const [comments, setComments] = useState("");
    const [reviews, setReviews] = useState([]);
    const appId = props.appId;
    const userId = props.userId;

    useEffect(() => {
        // updateAppDetails();
        
        fetchReviews(appId)
        .then((reviewsOfApp) => {
            setReviews(reviewsOfApp);
            console.log('reviews',reviewsOfApp);//array of objects
            //when below executes, review still empty arr, will update next render
            //which is, when useState returns value that you assign; this only happen once as reviews is a cons
            console.log('another reviews', reviews);
        })
        .catch((error) => {
            alert(error.message);
        });
      },[setReviews])

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
        <div>
           {reviews.map(review => {
                return (
                    <div key={review._id}>
                        <p>{review.value}</p>
                        {/* need to populate user */}
                        {/* <p>{review.user}</p> */}
                    </div>
                )
                })
            }
        
        <form onSubmit={handleSubmit} className="text-area">
            <label>Reviews</label>
            <input
                type="text"
                name="comments"
                value={comments} 
                onChange={handleChange} 
                placeholder="How do you like this app?"
                className="comment-text-area" 
            />
            <button type="submit" >submit</button>
        </form>

        </div> 
    )
}

export default TextArea;