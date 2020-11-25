import React, { useState } from 'react';
import SharedDialog from './SharedDialog.component';
import './SharedDialog.scss';

const SharedDialogContext = React.createContext();

export function SharedDialogProvider(props) {
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

  const { children } = props;

  return (
    <SharedDialogContext.Provider
      value={{
        openDialog: openDialog,
        closeDialog: closeDialog,
        dialogIsOpen: isOpen,
        dialogMessage: message,
      }}
    >
      {/* Render Snackbar presentation component here */}
      <SharedDialog />
      {children}
    </SharedDialogContext.Provider>
  );
}

export const SharedDialogConsumer = SharedDialogContext.Consumer;
export default SharedDialogContext;
