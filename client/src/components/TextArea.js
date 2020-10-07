import React, { useState, useEffect } from 'react';
import { addReview, fetchReviews } from '../services/review';
import './TextArea.scss';

const TextArea = (props) => {
  const [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const appId = props.app._id;
  const { userId } = props;

  const updateReviewsList = (appId) => {
    fetchReviews(appId)
      .then((reviewsOfApp) => {
        setReviews(reviewsOfApp);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    updateReviewsList(appId);
  }, [setReviews]);

  function handleChange(event) {
    setReviewInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // stops default reloading behaviour
    // make sure take the input value in state, not event.target.value

    addReview(reviewInput, appId, userId)
      .then(() => {
        alert(`Thank you for reviewing ${props.app.name}.`);

        updateReviewsList(appId);
        setReviewInput('');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const timeStampDates = (timeStamp) => timeStamp.slice(0, 10);

  return (
    <div id="rateApp">
      <h4>Reviews</h4>
      {reviews.map((review) => (
        <div key={review._id} className="reivews-container">
          <div className="review-user-container">
            <h5>{review.user.username}</h5>
            <h5 className="time-stamp">{timeStampDates(review.updatedAt)}</h5>
          </div>
          <p>{review.value}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="text-area">
        <textarea
          type="text"
          name="review-inputs"
          value={reviewInput}
          onChange={handleChange}
          placeholder="How do you like this app?"
          className="comment-text-area"
        />
        <button type="submit" className="small-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default TextArea;
