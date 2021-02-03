import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import './SharedDialog.scss';
import SharedDialog from './SharedDialog.component';

const SharedDialogContext = createContext(); // returns two components Provider and Consumer

function SharedDialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openDialog = (displayMessage) => {
    setMessage(displayMessage);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setMessage('');
    setIsOpen(false);
  };

  return (
    <SharedDialogContext.Provider
      value={{
        openDialog: openDialog,
      }}
    >
      <SharedDialog
        dialogIsOpen={isOpen}
        dialogMessage={message}
        closeDialog={closeDialog}
      />
      {/* contains all react dom children elements of component */}
      {children}
    </SharedDialogContext.Provider>
  );
}

SharedDialogProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { SharedDialogProvider };
export default SharedDialogContext;
