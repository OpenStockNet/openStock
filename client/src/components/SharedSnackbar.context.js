import React, { useState } from 'react';
import SharedSnackbar from './SharedSnackBar.component'
import './SharedSnackbar.scss';

const SharedSnackbarContext = React.createContext();

export function SharedSnackbarProvider(props) {
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ message ,setMessage ] = useState('');

  const openSnackbar = (message) => {
    setMessage(message);
    setIsOpen(true);
  };

  const closeSnackbar = () => {
    setMessage('');
    setIsOpen(false);
  };
  
  const { children } = props;

    return (
      <SharedSnackbarContext.Provider
        value={{
          openSnackbar: openSnackbar,
          closeSnackbar: closeSnackbar,
          snackbarIsOpen: isOpen,
          message: message,
        }}
      >
        {/* Render Snackbar presentation component here */}
        <SharedSnackbar /> 
        {children}
      </SharedSnackbarContext.Provider>
    );
  
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;
export default SharedSnackbarContext;