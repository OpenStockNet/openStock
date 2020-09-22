import React, { useState, useEffect } from "react";
import { addReview, fetchReviews } from "../services/review";
import "./TextArea.css";

const TextArea = (props) => {
    const [reviewInput, setReviewInput] = useState("");
    const [reviews, setReviews] = useState([]);
    const appId = props.app._id
    const userId = props.userId;

    useEffect(() => {
        updateReviewsList(appId)
    },[setReviews])

    function handleChange (event) {    
        setReviewInput(event.target.value);  
    }

    function handleSubmit (event) {
        event.preventDefault(); // stops default reloading behaviour
        //make sure take the input value in state, not event.target.value
        
        addReview(reviewInput, appId, userId)
            .then(() => {
                alert(`Thank you for reviewing ${props.app.name}.`);

                updateReviewsList(appId)
                setReviewInput("");
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    const updateReviewsList = (appId) => {
        fetchReviews(appId)
            .then((reviewsOfApp) => {
                setReviews(reviewsOfApp);
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <div>
           <h4>Reviews</h4>
           {reviews.map(review => 
                <div key={review._id}>
                    <p>{review.value}</p>
                    <p>{review.user.username}</p>
                </div>
                ) 
           }
        <form onSubmit={handleSubmit} className="text-area">
            <textarea
                type="text"
                name="review-inputs"
                value={reviewInput} 
                onChange={handleChange} 
                placeholder="How do you like this app?"
                className="comment-text-area" 
            />
            <button type="submit">submit</button>
        </form>
        </div> 
    )
}

export default TextArea;