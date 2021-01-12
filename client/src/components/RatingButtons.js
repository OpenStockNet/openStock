import React from 'react';
import './RatingButtons.scss';

const RatingButtons = (props) => (
  <div id="rateApp">
    <h4>Rate this app</h4>
    <div>
      <button type="button" value={1} onClick={props.onSubmitRating}>
        1 ✦
      </button>
      <button type="button" value={2} onClick={props.onSubmitRating}>
        2 ✦ ✦
      </button>
      <button type="button" value={3} onClick={props.onSubmitRating}>
        3 ✦ ✦ ✦
      </button>
      <button type="button" value={4} onClick={props.onSubmitRating}>
        4 ✦ ✦ ✦ ✦
      </button>
      <button type="button" value={5} onClick={props.onSubmitRating}>
        5 ✦ ✦ ✦ ✦ ✦
      </button>
    </div>
  </div>
);

export default RatingButtons;
