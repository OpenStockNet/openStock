import { Snackbar } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import './SharedDialog.scss';

const SharedDialog = ({ dialogIsOpen, dialogMessage, closeDialog }) => (
  <Snackbar
    className="top-message"
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={dialogIsOpen}
    message={dialogMessage}
    action={[
      <div className="dialog-aBtns" key={dialogMessage}>
        <a href="/login" className="dialog-btn">
          Log in
        </a>
        <button onClick={closeDialog} className="dialog-btn" type="button">
          Not now
        </button>
      </div>,
    ]}
  />
);

SharedDialog.propTypes = {
  dialogIsOpen: PropTypes.bool.isRequired,
  dialogMessage: PropTypes.string.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

export default SharedDialog;
