import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';
import { NotFoundIcon } from '../images';

const NotFoundPage = ({ errorMsg, url }) => (
  <div className="box-wrapper">
    <div className="box-center highlight">
      <img src={NotFoundIcon} alt="not_found_icon" />
      <p>{errorMsg}</p>
      <Link to="/" className="action-link">{url}</Link>
    </div>
  </div>

);

export default NotFoundPage;
