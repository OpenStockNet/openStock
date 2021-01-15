import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = ({ userId, onHandleWishList, icon }) => (
  <button
    type="button"
    key={userId}
    onClick={onHandleWishList}
    id="small"
  >
    <img src={icon} alt="" className="icon-btns" />
  </button>
);

IconButton.propTypes = {
  userId: PropTypes.string.isRequired,
  onHandleWishList: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconButton;
