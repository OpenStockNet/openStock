import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import './PopupModal.scss'

export default function PopupModal(props) {

  return (
    <div>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: 80,  left:500}}
        id={props.id}
        open={props.open}
        onClose={props.handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'bottom',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'bottom',
          }}
      >
         <Typography className='typography'>
             {props.wishListMessage}
        </Typography>
      </Popover>
    </div>
  );
}


