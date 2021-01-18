import React from 'react';
import PropTypes from 'prop-types';
import './RatingButtons.scss';

const RatingButtons = ({ onSubmitRating }) => (
  <div id="rateApp">
    <h4>Rate this app</h4>
    <div>
      <button type="button" value={1} onClick={onSubmitRating}>
        1 ✦
      </button>
      <button type="button" value={2} onClick={onSubmitRating}>
        2 ✦ ✦
      </button>
      <button type="button" value={3} onClick={onSubmitRating}>
        3 ✦ ✦ ✦
      </button>
      <button type="button" value={4} onClick={onSubmitRating}>
        4 ✦ ✦ ✦ ✦
      </button>
      <button type="button" value={5} onClick={onSubmitRating}>
        5 ✦ ✦ ✦ ✦ ✦
      </button>
    </div>
  </div>
);

RatingButtons.propTypes = {
  onSubmitRating: PropTypes.func.isRequired,
};

export default RatingButtons;
