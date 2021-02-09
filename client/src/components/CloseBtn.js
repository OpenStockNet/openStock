import React from 'react';
import PropTypes from 'prop-types';
import './CloseBtn.scss';

const CloseBtn = ({ onClick }) => (
  <div className="close-icon" onClick={onClick} role="presentation" />
);

CloseBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseBtn;
