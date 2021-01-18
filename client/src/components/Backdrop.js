import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const backdrop = ({ click }) => (
  <div className="backdrop" onClick={click} />
);

backdrop.propTypes = {
  click: PropTypes.func,
};

export default backdrop;
