import React from 'react';
import Backdrop from './Backdrop';
import { LoaderIcon } from '../images';

import './Loader.scss';

const loader = () => (
  <div className="wrapper" data-testid="loader">
    <Backdrop />
    <div className="loading">
      <img src={LoaderIcon} alt="loading" />
    </div>
  </div>
);

export default loader;
