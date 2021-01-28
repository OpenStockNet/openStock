import React from 'react';
import PropTypes from 'prop-types';
import './DrawerToggleBtn.scss';

const DrawerToggleBtn = ({ onClick }) => (
  <button type="button" className="toggle-btn" onClick={onClick}>
    <div className="toggle-btn-line" />
    <div className="toggle-btn-line" />
  </button>
);

DrawerToggleBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DrawerToggleBtn;
