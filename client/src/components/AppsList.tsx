import React from 'react';
import AppCard from './AppCard';
import NotFoundPage from './NotFoundPage';

import './AppsList.scss';

interface App {
  _id: string,
  logo: string,
  name: string,
  category: {
    name: string,
  },
}

interface Props {
  appsFiltered: App[],
  errorMsg: string,
  urlText: string,
  url: string,
}

function AppsList({
  appsFiltered, errorMsg, urlText, url,
} : Props ) {
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

export default AppsList;
