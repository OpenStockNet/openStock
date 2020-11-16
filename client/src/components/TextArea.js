import React, { useState, useEffect } from 'react';
import { addReview, fetchReviews } from '../services/review';
import './TextArea.scss';

import PopupModal from './PopupModal';

const TextArea = (props) => {
  const [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(null);

  const appId = props.app._id;
  const { userId } = props;

  const updateReviewsList = (reviewedAppId) => {
    fetchReviews(reviewedAppId)
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

  // popover
  const handleClose = () => {
    setOpen(false);
  };

  const confirm = open ? 'simple-popover' : null;
  function handleSubmit(event) {
    event.preventDefault(); // stops default reloading behaviour
    // make sure take the input value in state, not event.target.value

    addReview(reviewInput, appId, userId)
      .then(() => {
        setOpenMsg('Thanks for sharing!');
        setOpen(true);

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
      <PopupModal
        id={confirm}
        open={open}
        handleClose={handleClose}
        message={openMsg}
      />
      <h4>Comments</h4>
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
        <button type="submit" className="small-submit-btn">Post</button>
      </form>
    </div>
  );
};

export default TextArea;
