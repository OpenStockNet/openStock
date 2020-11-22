import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import './PopupModal.scss';

export default function PopupModal(props) {
  return (
    <div>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: 80, left: 550 }}
        id={props.id}
        open={props.open}
        onClose={props.handleClose}
      >
        <Typography className="typography">
          {props.message}
        </Typography>
      </Popover>
    </div>
  );
}
