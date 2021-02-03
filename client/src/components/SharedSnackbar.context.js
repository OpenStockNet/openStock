import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import SharedSnackbar from './SharedSnackBar.component';
import './SharedSnackbar.scss';

const SharedSnackbarContext = createContext();

function SharedSnackbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = (displayMessage) => {
    setMessage(displayMessage);
    setIsOpen(true);
  };

  const closeSnackbar = () => {
    setMessage('');
    setIsOpen(false);
  };

  return (
    <SharedSnackbarContext.Provider
      value={{
        openSnackbar: openSnackbar,
      }}
    >
      <SharedSnackbar
        snackbarIsOpen={isOpen}
        closeSnackbar={closeSnackbar}
        message={message}
      />
      {children}
    </SharedSnackbarContext.Provider>
  );
}

SharedSnackbarProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array, // see App.js, can be array of elements
  ]).isRequired,
};

export { SharedSnackbarProvider };
export default SharedSnackbarContext;
