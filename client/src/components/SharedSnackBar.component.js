import { Snackbar } from '@material-ui/core';
import React from 'react';
import { SharedSnackbarConsumer } from './SharedSnackbar.context';

import './SharedSnackbar.scss';

const SharedSnackbar = () => (

  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
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
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;
