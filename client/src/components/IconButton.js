import React from 'react';
import './IconButton.scss';

const IconButton = (props) => (
  <button
    type="button"
    key={props.userId}
    onClick={props.onHandleWishList}
    id="small"
  >
    <img src={props.icon} alt="" className="icon-btns" />
  </button>
);

export default IconButton;
