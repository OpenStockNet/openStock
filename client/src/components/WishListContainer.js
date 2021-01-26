import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchAllApps } from '../services/app';
import Loader from './Loader';
import AppsList from './AppsList';

import SharedDialogContext from './SharedDialog.context';

// fetch all apps, filter to wishUser_id includes props user id
function WishListContainer({ user, isUserLoading }) {
  const [wishedApps, setWishedApps] = useState(null);
  const [appsLoading, setAppsLoading] = useState(true);

  const { openDialog } = useContext(SharedDialogContext);

  useEffect(() => {
    if (isUserLoading) {
      return; // do nothing
    }

    if (user) {
      fetchAllApps()
        .then((apps) => {
          if (user) {
            const appsFiltered = apps.filter((app) => app.wishUser.includes(user._id));
            setWishedApps(appsFiltered);
            setAppsLoading(false);
          }
        })
        .catch((error) => {
          setAppsLoading(false);
          alert(error.message);
        });
    } else {
      setAppsLoading(false);
      openDialog('Log in to continue.');
    }
  }, [isUserLoading]);

  if (isUserLoading || appsLoading) return <Loader />;

  return (
    <main>
      <h1>My wish list</h1>
      { user
        && (
        <AppsList
          appsFiltered={wishedApps}
          text={'You haven\'t created your wish list.'}
        />
        )}
    </main>
  );
}

WishListContainer.propTypes = {
  user: PropTypes.object,
  isUserLoading: PropTypes.bool.isRequired,
};

export default WishListContainer;
