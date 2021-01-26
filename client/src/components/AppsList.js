import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import AppCard from './AppCard';
import NotFoundPage from './NotFoundPage';

import './AppsList.scss';

function AppsList({ appsFiltered, text }) {
  const apps = appsFiltered.map((app) => (
    <AppCard
      key={app._id}
      appId={app._id}
      src={app.logo}
      appName={app.name}
      appCategoryName={app.category.name}
    />
  ));

  return (
    <>
      <section id="listContainer" className="fadeIn">
        {apps || <Loader />}
      </section>
      {appsFiltered.length === 0 && (
        <NotFoundPage errorMsg="No apps found on your wish list." url="Start exploring" />
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
      category: PropTypes.object,
    }),
  ).isRequired,
  text: PropTypes.string,
};

export default AppsList;
