import React from 'react';
import PropTypes from 'prop-types';
import './CloseBtn.scss';

const closeBtn = ({ onClick }) => (
  <div className="close-icon" onClick={onClick} />
);

closeBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default closeBtn;
