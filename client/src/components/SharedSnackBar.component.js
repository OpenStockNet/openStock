import { IconButton, Snackbar } from '@material-ui/core';
//import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { SharedSnackbarConsumer } from './SharedSnackbar.context';

import './SharedSnackbar.scss';


// const StyledSnackbar = withStyles({
//     root: {
//     //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     //   borderRadius: 3,
//     //   border: 0,
//     //   color: 'white',
        
//       background: 'transparent',
//       height: 48,
//     //   padding: '0 30px',
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     },
//     label: {
//       textTransform: 'capitalize',
//     },
//   })(Snackbar);


const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarIsOpen}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message={message}
        // style={styles.snackbar}
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
