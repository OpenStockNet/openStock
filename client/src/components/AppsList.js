import React from 'react';
import PropTypes from 'prop-types';
import AppCard from './AppCard';
import NotFoundPage from './NotFoundPage';

import './AppsList.scss';

function AppsList({
  appsFiltered, errorMsg, urlText, url,
}) {
  return (
    <>
      <section id="listContainer" className="fadeIn" data-testid="app-list">
        {appsFiltered.map((app) => (
          <AppCard
            key={app._id}
            appId={app._id}
            src={app.logo}
            appName={app.name}
            appCategoryName={app.category.name}
          />
        ))}
      </section>
      {appsFiltered.length === 0 && (
        <NotFoundPage errorMsg={errorMsg} urlText={urlText} url={url} />
      )}
    </>
  );
}

AppsList.propTypes = {
  appsFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  errorMsg: PropTypes.string,
  urlText: PropTypes.string,
  url: PropTypes.string,
};

AppsList.defaultProps = {
  errorMsg: 'error occurs',
  urlText: '',
  url: '',
};

export default AppsList;
