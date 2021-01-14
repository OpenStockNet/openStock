import React from 'react';
import Loader from './Loader';
import AppCard from './AppCard';

import './AppsList.scss';

function AppsList(props) {
  const apps = props.appsFiltered.map((app) => (
    <AppCard
      key={app._id}
      appId={app._id}
      src={app.logo}
      appName={app.name}
      appCategoryName={app.category.name}
    />
  ));

  return (
    <section id="listContainer" className="fadeIn">
      {apps || <Loader />}
      {props.appsFiltered.length === 0 && (
      <p>{props.text}</p>
      )}
    </section>
  );
}

export default AppsList;
