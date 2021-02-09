import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const Backdrop = ({ onClick }) => (
  <div className="backdrop" onClick={onClick} role="presentation" data-testid="backdrop" />
);

Backdrop.propTypes = {
  onClick: PropTypes.func,
};

Backdrop.defaultProps = {
  onClick: () => {},
};

export default Backdrop;
