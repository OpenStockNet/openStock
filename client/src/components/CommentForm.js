import React from 'react';
import './CommentForm.scss';

function CommentForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="text-area">
      <textarea
        type="text"
        name="review-inputs"
        value={props.reviewInput}
        onChange={props.onChange}
        placeholder="How do you like this app?"
        className="comment-text-area"
      />
      <button type="submit" className="small-submit-btn">Post</button>
    </form>
  );
}

export default CommentForm;
