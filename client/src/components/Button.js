import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

function Button({ children, onClick, value }) {
  return (
    <button type="submit" onClick={onClick} value={value}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.number,
};
Button.defaultProps = {
  value: 0,
};

export default Button;
