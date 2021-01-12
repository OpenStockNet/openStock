import React from 'react';
import './CommentCard.scss';

function CommentCard(props) {
  const timeStampDates = (timeStamp) => timeStamp.slice(0, 10);

  return (
    <div className="reviews-container">
      <div className="review-user-container">
        <h5>{props.review.user.username}</h5>
        <h5 className="time-stamp">{timeStampDates(props.review.updatedAt)}</h5>
      </div>
      <p>{props.review.value}</p>
    </div>
  );
}

export default CommentCard;
