import { IconButton, Snackbar } from '@material-ui/core';
// import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { SharedSnackbarConsumer } from './SharedSnackbar.context';

import './SharedSnackbar.scss';

const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarIsOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={message}
        // action={[
        //   <IconButton key="close" color="inherit" onClick={closeSnackbar}>
        //     <Close />
        //   </IconButton>,
        // ]}
      />
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;
