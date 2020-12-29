import React, { useEffect, useState } from 'react';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import Loader from './Loader';
import AppsList from './AppsList';

function List(props) {
  useEffect(() => {
    getApp();
  }, [props.queries]);

  function getApp() {
    const filteredApp = props.appsList.filter((searchApp) => searchApp.name.toLowerCase().includes(props.queries.toLowerCase()));
    props.setApps(filteredApp);
  }

  const apps = props.appsFiltered.map((app) => (
    <AppsList
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
      <h4>Sorry, we haven't found any alternative app 😧. Try something different.</h4>
      )}
    </section>
  );
}

export default List;
