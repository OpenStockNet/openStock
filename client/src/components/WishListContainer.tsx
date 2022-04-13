import React, { useState, useEffect, useContext } from 'react';
import { fetchAllApps, App } from '../services/app';
import Loader from './Loader';
import AppsList from './AppsList';
import NotFoundPage from './NotFoundPage';

import SharedDialogContext from './SharedDialog.context';

interface Props {
  userId: string,
  isUserLoading: boolean,
}

function WishListContainer({ userId, isUserLoading } : Props ) {
  const [wishedApps, setWishedApps] = useState<App[]>([]) // tell useState what type of parameter it should receive
  const [appsLoading, setAppsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const { openDialog } = useContext(SharedDialogContext);

  useEffect(() => {
    if (isUserLoading) {
      return; // do nothing
    }

    if (userId) {
      fetchAllApps()
        .then((apps) => {
          if (userId) {
            const appsFiltered = apps.filter((app) => app.wishUser.includes(userId));
            setWishedApps(appsFiltered); // Error: Argument of type 'App[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
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

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg!} />; // Error: Type 'null' is not assignable to type 'string'

  if (isUserLoading || appsLoading) return <Loader />;

  return (
    <main>
      <h1>My wish list</h1>
      { userId
        && (
        <AppsList
          appsFiltered={wishedApps}
          errorMsg="No apps added yet."
          urlText="Start exploring"
          url="/"
        />
        )}
    </main>
  );
}

export default WishListContainer;
