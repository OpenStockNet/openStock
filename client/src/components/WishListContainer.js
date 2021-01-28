import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchAllApps } from '../services/app';
import Loader from './Loader';
import AppsList from './AppsList';
import NotFoundPage from './NotFoundPage';

import SharedDialogContext from './SharedDialog.context';

function WishListContainer({ user, isUserLoading }) {
  const [wishedApps, setWishedApps] = useState(null);
  const [appsLoading, setAppsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

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
          setErrorMsg(error.message);
        });
    } else {
      setAppsLoading(false);
      openDialog('Log in to continue.');
    }
  }, [isUserLoading]);

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg} />;
  if (isUserLoading || appsLoading) return <Loader />;

  return (
    <main>
      <h1>My wish list</h1>
      { user
        && (
        <AppsList
          appsFiltered={wishedApps}
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
