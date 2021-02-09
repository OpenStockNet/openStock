import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotFoundPage.scss';
import { NotFoundIcon } from '../images';

const NotFoundPage = ({ errorMsg, url }) => (
  <div className="box-wrapper" data-testid="not-found-page">
    <div className="box-center highlight">
      <img src={NotFoundIcon} alt="not_found_icon" />
      <p>{errorMsg}</p>
      <Link to="/" className="action-link">{url}</Link>
    </div>
  </div>
);

NotFoundPage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  url: PropTypes.string,
};

NotFoundPage.defaultProps = {
  url: 'url',
};

export default NotFoundPage;
