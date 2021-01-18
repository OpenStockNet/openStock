import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import appIconPlaceholder from '../images/logoPlaceholder.svg';
import './AppCard.scss';

const AppCard = ({
  appId, src, appName, appCategoryName,
}) => (
  <div className="appCard">
    <Link to={`/apps/${appId}`}>
      <img src={src || appIconPlaceholder} alt="" />
    </Link>
    <div>
      <Link to={`/apps/${appId}`}>
        <h3>{appName}</h3>
      </Link>
      <h6>{appCategoryName}</h6>
    </div>
  </div>
);

AppCard.propTypes = {
  appId: PropTypes.string.isRequired,
  src: PropTypes.string,
  appName: PropTypes.string.isRequired,
  appCategoryName: PropTypes.string.isRequired,
};

export default AppCard;
