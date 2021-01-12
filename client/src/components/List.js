import React, { useEffect, useState } from 'react';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import Loader from './Loader';
import AppCard from './AppCard';

function List(props) {
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
      <h4>Sorry, we haven't found any alternative app 😧. Try something different.</h4>
      )}
    </section>
  );
}

export default List;
