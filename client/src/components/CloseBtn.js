import React from 'react';
import PropTypes from 'prop-types';
import './CloseBtn.scss';

const closeBtn = ({ click }) => (
  <div className="close-icon" onClick={click} />
);

closeBtn.propTypes = {
  click: PropTypes.func.isRequired,
};

export default closeBtn;
