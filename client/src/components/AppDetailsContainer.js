import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  fetchApp, deleteApp, addWishApp, removeWishApp,
} from '../services/app';
import { getAverageRating, rateApp } from '../services/rating';
import CommentsContainer from './CommentsContainer';
import RatingButtons from './RatingButtons';
import IconButton from './IconButton';
import Loader from './Loader';
import NotFoundPage from './NotFoundPage';
import SubjectBlock from './SubjectBlock';
import Button from './Button';

import iconPlusSign from '../images/iconPlusSign.svg';
import iconApproved from '../images/iconApproved.svg';
import iconPencilEdit from '../images/iconPencilEdit.svg';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './AppDetailsContainer.scss';

function AppDetailsContainer({ userId, match, history }) {
  const [app, setApp] = useState(null);
  const [avrageRating, setAverageRating] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  // comsuming value from context
  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  const appId = match.params.id;

  useEffect(() => {
    updateAppDetails();

    getAverageRating(appId)
      .then((averageRating) => {
        setAverageRating(averageRating);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  const updateAppDetails = () => {
    fetchApp(appId)
      .then((theApp) => {
        setApp(theApp);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const ensureLogin = (callbackFunc) => {
    const dialogMessage = 'Log in to continue.';
    if (userId) {
      callbackFunc();// () => sendSubmitRatingRequest(event) or sendWishListRequest
    } else {
      openDialog(dialogMessage);
    }
  };

  const sendSubmitRatingRequest = (event) => {
    const ratingValue = event.target.value;
    rateApp(ratingValue, appId)
      .then(() => {
        updateAvrRating(appId);
        updateAppDetails();
        openSnackbar(`Thank you for rating ${app.name}!`);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const handleSubmitRating = (event) => {
    // pass entire anonymous function as callback
    // but not pass return value of 'sendSubmitRatingRequest(event)'
    ensureLogin(() => sendSubmitRatingRequest(event));
  };

  const sendWishListRequest = () => {
    addWishApp(appId, userId)
      .then(() => {
        updateAppDetails();
        openSnackbar(`${app.name} is added to wish list!`);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const handleAddToWishList = () => {
    ensureLogin(sendWishListRequest);
  };

  const sendRemoveRequest = () => {
    removeWishApp(appId, userId)
      .then(() => {
        updateAppDetails();
        openSnackbar(`${app.name} is removed from wish list!`);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const handleRemoveFromWishList = () => {
    ensureLogin(sendRemoveRequest);
  };

  const updateAvrRating = () => {
    getAverageRating(appId)
      .then((averageRating) => {
        setAverageRating(averageRating);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  const handleDeleteApp = () => {
    deleteApp(appId)
      .then(() => {
        openSnackbar(`${app.name} is deleted!`);
        history.push('/');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  if (errorMsg) return <NotFoundPage errorMsg={errorMsg} />;
  if (!app) return <Loader />;

  const wishListBtns = (
    app.wishUser.includes(userId)
      ? <IconButton onClick={handleRemoveFromWishList} icon={iconApproved} title="added to wish list" />
      : <IconButton onClick={handleAddToWishList} icon={iconPlusSign} title="add to wish list" />
  );

  const editLinkBtn = (
    <Link to={`/apps/${appId}/edit`} id="small">
      <img src={iconPencilEdit} alt="" className="icon-btns" title="edit" />
    </Link>
  );

  let deleteBtn;
  if (userId && app.creator && userId === app.creator._id) {
    deleteBtn = (
      <div id="rateApp">
        <h4>This app is not valid?</h4>
        <Button onClick={handleDeleteApp}>Delete</Button>
      </div>
    );
  }

  let lastUpdateUser;
  if (app.creator && app.editors.length < 1) {
    lastUpdateUser = (app.creator.username);
  } else if (app.editors.length > 0 && app.editors[app.editors.length - 1].username) {
    lastUpdateUser = (app.editors[app.editors.length - 1].username);
  } else {
    lastUpdateUser = ('OpenStock');
  }

  return (
    <main id="appDetail">
      <div className="appIntro">
        <SubjectBlock
          logo={app.logo}
          name={app.name}
          category={app.category.name}
          website={app.website}
        />
        <div className="ratingApp">
          <h5>Rating</h5>
          <p>
            {avrageRating}
            {' '}
            <span>✦</span>
          </p>
        </div>
      </div>

      <div className="icons-container">
        {wishListBtns}
        {editLinkBtn}
      </div>

      <div className="description">
        <h3>Description</h3>
        <p>{app.description}</p>
        <div>
          <h4>Available devices:</h4>
          <ul>{app.device && app.device.map((device) => <li key={device}>{device}</li>)}</ul>
        </div>
        <RatingButtons
          onSubmitRating={handleSubmitRating}
        />
        <CommentsContainer
          userId={userId}
          appId={app._id}
        />
        {deleteBtn}
      </div>
      <div>
        <div className="notes">
          This page was last updated by
          {' '}
          {lastUpdateUser}
          .
        </div>
      </div>
    </main>
  );
}

AppDetailsContainer.propTypes = {
  userId: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

AppDetailsContainer.defaultProps = {
  userId: 'userId',
};

export default AppDetailsContainer;
