import React, { useState } from 'react';
import { logout } from '../services/auth';

import CloseBtn from './CloseBtn';
import Backdrop from './Backdrop';
import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './SideDrawer.scss';
import './Popover.scss';

const PopoverCenter = () => {
    const [show, setShow] = useState(true); 
    
    const handlePopoverClose = () => {
        // popover display: none
        // backdrop: remove
        setShow(false);
    }
    let popoverClasses = 'popover-container';
    if (!show) {
        popoverClasses = 'popover-container close';
    }

    let backdrop;
    if (show) {
        backdrop = <Backdrop />;
    }
    
    return (
        <div>
            {/* <Backdrop/>
            <div className='popover-container'>
                <p>popover text comes here!</p>
                <button id='small' onClick={handlePopoverClose}>continue the journey</button>
            </div> */}
            {backdrop}
            <div className={popoverClasses}>
                <p>popover text comes here!</p>
                <button className='primary' onClick={handlePopoverClose}>continue the journey</button>
            </div>
            
        </div>
    )
};


export default PopoverCenter;