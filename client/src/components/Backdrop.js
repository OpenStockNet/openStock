import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const backdrop = ({ onClick }) => (
  <div className="backdrop" onClick={onClick} role="presentation" />
);

backdrop.propTypes = {
  onClick: PropTypes.func,
};

export default backdrop;
