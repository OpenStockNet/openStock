import React from 'react';
import './Loader.scss';
import Backdrop from './Backdrop';
import { LoaderIcon } from '../images';


const loader = () => (
  <div>
    <Backdrop />
    <div className="loading">
        <img src={LoaderIcon} alt='loading' />
    </div>
  </div>
);

export default loader;
