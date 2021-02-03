import { Snackbar } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import './SharedSnackbar.scss';

const SharedSnackbar = ({ snackbarIsOpen, message, closeSnackbar }) => (
  <Snackbar
    className="success"
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={snackbarIsOpen}
    autoHideDuration={3000}
    onClose={closeSnackbar}
    message={message}
  />
);

SharedSnackbar.propTypes = {
  snackbarIsOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
};

export default SharedSnackbar;
