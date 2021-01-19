import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = ({
  onHandleWishList, icon, title,
}) => (
  <button
    type="button"
    onClick={onHandleWishList}
    id="small"
    title={title}
  >
    <img src={icon} alt="" className="icon-btns" />
  </button>
);

IconButton.propTypes = {
  onHandleWishList: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconButton;
