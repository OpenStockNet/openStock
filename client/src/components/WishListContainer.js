import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchAllApps } from '../services/app';
import Loader from './Loader';
import AppsList from './AppsList';

import SharedDialogContext from './SharedDialog.context';

// fetch all apps, filter to wishUser_id includes props user id
function WishListContainer({ user }) {
  const [wishedApps, setWishedApps] = useState(null);

  const { openDialog } = useContext(SharedDialogContext);

  useEffect(() => {
    if (!user) {
      openDialog('Log in to continue.');
    } else {
      fetchAllApps()
        .then((apps) => {
          const appsFiltered = apps.filter((app) => app.wishUser.includes(user._id));
          setWishedApps(appsFiltered);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [setWishedApps]);

  if (!wishedApps) return <Loader />;

  return (
    <main>
      <h1>My wish list</h1>
      { user
        && (
        <AppsList
          appsFiltered={wishedApps}
          text={'You haven\'t created your wish list.  Log in to add apps.'}
        />
        )}
    </main>
  );
}

WishListContainer.propTypes = {
  user: PropTypes.object,
};

export default WishListContainer;
