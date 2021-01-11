import React, { useState, useEffect, useContext } from 'react';
import { fetchAllApps } from '../services/app';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import Loader from './Loader';
import AppCard from './AppCard';

import SharedDialogContext from './SharedDialog.context';

// fetch all apps, filter to wishUser_id includes props user id
function WishListHook(props) {
  const [appList, setAppList] = useState([]);

  const { openDialog } = useContext(SharedDialogContext);

  useEffect(() => {
    if (!props.user) { openDialog('Log in to continue.'); } else {
      fetchAllApps()
        .then((apps) => {
          setAppList(apps);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [setAppList]);

  const loggedInWishList = (
    <section id="listContainer" className="fadeIn">
      {appList
        .filter((app) => app.wishUser.includes(props.user._id))
        .map((app) => (
          <AppCard
            appId={app._id}
            src={app.logo || appIconPlaceholder}
            appName={app.name}
            appCategoryName={app.category.name}
          />
        ))}
    </section>
  );

  if (!appList) return <Loader />;

  return (
    <main>
      <h1>My wish list</h1>
      { props.user && loggedInWishList }
    </main>
  );
}

export default WishListHook;
