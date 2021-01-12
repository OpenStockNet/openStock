import React, { useState, useEffect, useContext } from 'react';
import { addReview, fetchReviews } from '../services/review';
import './CommentsContainer.scss';

import CommentCard from './CommentCard';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

// TODO: clean up; seperate concerns of textArea input and displaying reviews
// TODO: comments container => textArea component
const CommentsContainer = (props) => {
  const [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState([]);

  const appId = props.app._id;
  const { userId } = props;

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

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

  const ensureLogin = (callbackFunc) => {
    const dialogMessage = 'Log in to continue.';
    if (props.userId) {
      callbackFunc();
    } else {
      openDialog(dialogMessage);
    }
  };

  const sendReviewRequest = () => {
    // make sure take the input value in state, not event.target.value
    addReview(reviewInput, appId, userId)
      .then(() => {
        updateReviewsList(appId);
        setReviewInput('');
        openSnackbar('Thanks for sharing your thoughts!');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ensureLogin(sendReviewRequest);
  };

  return (
    <div id="rateApp">
      <h4>Comments</h4>
      {reviews.map((review) => (
        <CommentCard review={review} key={review._id} />
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

export default CommentsContainer;
