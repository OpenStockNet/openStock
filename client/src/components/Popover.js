import React, { useState, useEffect } from 'react';

import CloseBtn from './CloseBtn';
import Backdrop from './Backdrop';
import confettiIcon from '../images/confetti.svg'
import './Popover.scss';

const PopoverCenter = () => {
    const [show, setShow] = useState(true); 

    function handlePopoverClose() {
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
        <div >
            {backdrop}
            <div className={popoverClasses}>
            <img src={confettiIcon}/>
                <div>
                    <h1>Schascha &#x2764;</h1>
                    <p>Thanks for shedding lights on my world to programming in 2020. Would you like to shine through 2021 together?</p>
                </div>
                <button className='primary' onClick={handlePopoverClose}>YES, I DO</button>
            </div>
        </div>
    )
};


export default PopoverCenter;