import React from 'react';
import PropTypes from 'prop-types';
import appIconPlaceholder from '../images/logoPlaceholder.svg';
import './SubjectBlock.scss';

function SubjectBlock({
  logo, name, category, website,
}) {
  return (
    <div className="appInfo">
      <img src={logo || appIconPlaceholder} alt="" />
      <div>
        <h2 className="highlight">{name}</h2>
        <h4>{category}</h4>
        <a target="_blank" rel="noreferrer" href={website ? `${website}` : '/'}>
          <span>⎋</span>
          Visit official website
        </a>
      </div>
    </div>
  );
}

SubjectBlock.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

SubjectBlock.defaultProps = {
  logo: appIconPlaceholder,
};

export default SubjectBlock;
