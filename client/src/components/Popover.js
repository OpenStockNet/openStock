import React, { useState } from 'react';
import Backdrop from './Backdrop';
import confettiIcon from '../images/confetti.svg';
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
    <div>
      {backdrop}
      <div className={popoverClasses}>
        <img src={confettiIcon} alt="confetti_icon" />
        <div>
          <h1>Happy 2021 &#x2764;</h1>
          <p>
            We are on the right track to protect and respect our privacy.
            Would you like to continue the journey?
          </p>
        </div>
        <button type="button" className="primary" onClick={handlePopoverClose}>YES, I DO</button>
      </div>
    </div>
  );
};

export default PopoverCenter;
