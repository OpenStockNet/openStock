import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

const IconButton = ({
  onClick, icon, title,
}) => (
  <button
    type="button"
    onClick={onClick}
    id="small"
    title={title}
  >
    <img src={icon} alt="" className="icon-btns" />
  </button>
);

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default IconButton;
