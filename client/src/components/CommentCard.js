import React from 'react';
import PropTypes from 'prop-types';
import './CommentCard.scss';

function CommentCard({ review }) {
  const timeStampDates = (timeStamp) => timeStamp.slice(0, 10);

  return (
    <div className="reviews-container">
      <div className="review-user-container">
        <h5>{review.user.username}</h5>
        <h5 className="time-stamp">{timeStampDates(review.updatedAt)}</h5>
      </div>
      <p>{review.value}</p>
    </div>
  );
}

CommentCard.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.object,
    value: PropTypes.string,
  }),
};

export default CommentCard;
