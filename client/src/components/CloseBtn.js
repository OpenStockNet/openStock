import React from 'react';
import './CloseBtn.scss';

const closeBtn = (props) => (
  <div className="close-icon" onClick={props.click} />
);

export default closeBtn;
