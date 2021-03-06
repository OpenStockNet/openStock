import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotFoundPage.scss';
import { NotFoundIcon } from '../images';

const NotFoundPage = ({ errorMsg, urlText, url }) => (
  <div className="box-wrapper" data-testid="not-found-page">
    <div className="box-center highlight">
      <img src={NotFoundIcon} alt="not_found_icon" />
      <p>{errorMsg}</p>
      <Link to={url} className="action-link">{urlText}</Link>
    </div>
  </div>
);

NotFoundPage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  urlText: PropTypes.string,
  url: PropTypes.string,
};

NotFoundPage.defaultProps = {
  urlText: PropTypes.string,
  url: 'url',
};

export default NotFoundPage;
