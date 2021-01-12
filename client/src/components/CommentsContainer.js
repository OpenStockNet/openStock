import React, { useState, useEffect, useContext } from 'react';
import { addReview, fetchReviews } from '../services/review';

import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

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

  function handleInputChange(event) {
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
      <CommentForm
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        reviewInput={reviewInput}
      />
    </div>
  );
};

export default CommentsContainer;
