import React, { useState, useEffect } from 'react';
import { fetchAllApps } from '../services/app';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import Loader from './Loader';
import AppsList from './AppsList';

// fetch all apps, filter to wishUser_id includes props user id
function WishListHook(props) {
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    fetchAllApps()
      .then((apps) => {
        setAppList(apps);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [setAppList]);

  if (!appList) return <Loader />;

  return (
    <div>
      <h1>My wish list</h1>
      <section id="listContainer" className="fadeIn">
        {appList
          .filter((app) => app.wishUser.includes(props.user._id))
          .map((app) => (
            <AppsList 
              appId={app._id}
              src={app.logo || appIconPlaceholder}
              appName={app.name}
              appCategoryName={app.category.name}
            />
          ))}
      </section>
    </div>
  );
}

export default WishListHook;
