import React from 'react';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import Loader from './Loader';
import AppCard from './AppCard';

import './AppsList.scss';

function AppsList(props) {
  const apps = props.appsFiltered.map((app) => (
    <AppCard
      key={app._id}
      appId={app._id}
      src={app.logo || appIconPlaceholder}
      appName={app.name}
      appCategoryName={app.category.name}
    />
  ));

  return (
    <section id="listContainer" className="fadeIn">
      {apps || <Loader />}
      {props.appsFiltered.length === 0 && (
      <h4>{props.text}</h4>
      )}
    </section>
  );
}

export default AppsList;
