import React from 'react';
import { Link } from 'react-router-dom';
import './AppCard.scss';

const AppCard = (props) => (
  <div className="appCard">
    <Link to={`/apps/${props.appId}`}>
      <img src={props.src} alt="" />
    </Link>
    <div>
      <Link to={`/apps/${props.appId}`}>
        <h3>{props.appName}</h3>
      </Link>
      <h6>{props.appCategoryName}</h6>
    </div>
  </div>
);

export default AppCard;