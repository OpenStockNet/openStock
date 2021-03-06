import React from 'react';
import PropTypes from 'prop-types';
import './CommentForm.scss';

function CommentForm({ onSubmit, reviewInput, onChange }) {
  return (
    <form onSubmit={onSubmit} className="text-area">
      <textarea
        type="text"
        name="review-inputs"
        value={reviewInput}
        onChange={onChange}
        placeholder="How do you like this app?"
        className="comment-text-area"
      />
      <button type="submit" className="small-submit-btn">Post</button>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reviewInput: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  reviewInput: 'review',
};

export default CommentForm;
