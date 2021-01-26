import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { addReview, fetchReviews } from '../services/review';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import NotFoundPage from './NotFoundPage';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

const CommentsContainer = ({ userId, app }) => {
  const [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const appId = app._id;

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  const updateReviewsList = (reviewedAppId) => {
    fetchReviews(reviewedAppId)
      .then((reviewsOfApp) => {
        setReviews(reviewsOfApp);
      })
      .catch((error) => {
        setErrorMsg(error.message);
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
    if (userId) {
      callbackFunc();
    } else {
      openDialog(dialogMessage);
    }
  };

  const sendReviewRequest = () => {
    // take input value in state, not event.target.value
    addReview(reviewInput, appId, userId)
      .then(() => {
        updateReviewsList(appId);
        setReviewInput('');
        openSnackbar('Thanks for sharing your thoughts!');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ensureLogin(sendReviewRequest);
  };

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg} />;

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

CommentsContainer.propTypes = {
  userId: PropTypes.string,
  app: PropTypes.object.isRequired,
};

export default CommentsContainer;
