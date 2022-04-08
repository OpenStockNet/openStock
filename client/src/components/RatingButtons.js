import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './RatingButtons.scss';

const RatingButtons = ({ onSubmitRating }) => (
  <div id="rateApp">
    <h4>Rate this app</h4>
    <div>
      <Button value={1} onClick={onSubmitRating}>1 ✦</Button>
      <Button value={2} onClick={onSubmitRating}>2 ✦ ✦</Button>
      <Button value={3} onClick={onSubmitRating}>3 ✦ ✦ ✦</Button>
      <Button value={4} onClick={onSubmitRating}>4 ✦ ✦ ✦ ✦</Button>
      <Button value={5} onClick={onSubmitRating}>5 ✦ ✦ ✦ ✦ ✦</Button>
    </div>
  </div>
);

RatingButtons.propTypes = {
  onSubmitRating: PropTypes.func.isRequired,
};

export default RatingButtons;
