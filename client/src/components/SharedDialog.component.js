import { Snackbar } from '@material-ui/core';
import React from 'react';
import { SharedDialogConsumer } from './SharedDialog.context';

import './SharedDialog.scss';

const SharedDialog = () => (
  <SharedDialogConsumer>
    {({ dialogIsOpen, dialogMessage, closeDialog }) => (
      <Snackbar
        className="top-message"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={dialogIsOpen}
        onClose={closeDialog}
        message={dialogMessage}
        action={[
          <div className="dialog-aBtns">
            <a href="/login" className="dialog-btn">
              Log in
            </a>
            <button onClick={closeDialog} className="dialog-btn" type="button">
              Not now
            </button>
          </div>,
        ]}
      />
    )}
  </SharedDialogConsumer>
);

export default SharedDialog;
