import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchApp, deleteApp, addWishApp, removeWishApp,
} from '../services/app';
import { getAverageRating, rateApp } from '../services/rating';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import CommentsContainer from './CommentsContainer';
import Loader from './Loader';

import iconPlusSign from '../images/iconPlusSign.svg';
import iconApproved from '../images/iconApproved.svg';
import iconPencilEdit from '../images/iconPencilEdit.svg';

import SharedSnackbarContext from './SharedSnackbar.context';
import SharedDialogContext from './SharedDialog.context';

import './AppDetailsContainer.scss';
// import { CloudStorageIcon } from '../images';

function AppDetail(props) {
  const [app, setApp] = useState(null);
  const [avrRating, setAvrRating] = useState(0);

  const { openSnackbar } = useContext(SharedSnackbarContext);
  const { openDialog } = useContext(SharedDialogContext);

  const appId = props.match.params.id;
  const userId = props.user._id;

  useEffect(() => {
    updateAppDetails();

    // calls function getAverageRating() with appId param from rating.js
    getAverageRating(appId)
      .then((averageRating) => {
        setAvrRating(averageRating);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [appId, avrRating]);

  const updateAppDetails = () => {
    fetchApp(appId)
      .then((theApp) => {
        setApp(theApp);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // check on frontend if user logs in
  const ensureLogin = (callbackFunc) => {
    const dialogMessage = 'Log in to continue.';
    if (props.user) {
      callbackFunc();
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
        alert(error.message);
      });
  };

  const submitRating = (event) => {
    // anonymous function (()=>{}), as need to pass a parameter which is a function
    // ensureLogin desides whenever to call sendSubmitRatingRequest
    ensureLogin(() => sendSubmitRatingRequest(event));
  };

  const sendWishListRequest = () => {
    addWishApp(appId, userId)
      .then(() => {
        updateAppDetails();
        openSnackbar(`${app.name} is added to wish list!`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addToWishList = () => {
    // sendWishListRequest is callback passed to ensureLogin;
    // ensureLogin call callback if props.user
    ensureLogin(sendWishListRequest);
  };

  const sendRemoveRequest = () => {
    removeWishApp(appId, userId)
      .then(() => {
        updateAppDetails();
        openSnackbar(`${app.name} is removed from wish list!`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const removeFromWishList = () => {
    ensureLogin(sendRemoveRequest);
  };

  const updateAvrRating = () => {
    getAverageRating(appId)
      .then((averageRating) => {
        setAvrRating(averageRating);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const deleteOneApp = () => {
    deleteApp(appId)
      .then(() => {
        openSnackbar(`${app.name} is deleted!`);
        props.history.push('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // if there's a need to change only on frontend, you should not mutate an object in "state",
  // instead: make a copy, modify copy, and replace original object with copy

  const ratingBtns = (
    <div id="rateApp">
      <h4>Rate this app</h4>
      <div>
        <button type="button" value={1} onClick={submitRating}>
          1 ✦
        </button>
        <button type="button" value={2} onClick={submitRating}>
          2 ✦ ✦
        </button>
        <button type="button" value={3} onClick={submitRating}>
          3 ✦ ✦ ✦
        </button>
        <button type="button" value={4} onClick={submitRating}>
          4 ✦ ✦ ✦ ✦
        </button>
        <button type="button" value={5} onClick={submitRating}>
          5 ✦ ✦ ✦ ✦ ✦
        </button>
      </div>
    </div>
  );

  // if (!app) return <div />;
  if (!app) return <Loader />;

  const wishListBtn = (
    <button type="button" key={props.user._id} onClick={addToWishList} id="small">
      <img src={iconPlusSign} alt="" className="icon-btns" />
    </button>
  );

  const removeWishListBtn = (
    <button type="button" key={props.user._id} onClick={removeFromWishList} id="small">
      <img src={iconApproved} alt="" className="icon-btns" />
    </button>
  );

  const wishListBtns = (
    app.wishUser.includes(props.user._id) ? removeWishListBtn : wishListBtn
  );

  const editLinkBtn = (
    <Link to={`/apps/${appId}/edit`} id="small">
      <img src={iconPencilEdit} alt="" className="icon-btns" />
    </Link>
  );

  let deleteBtn;
  if (props.user._id && app.creator && props.user._id === app.creator._id) {
    deleteBtn = (
      <div id="rateApp">
        <h4>This app is not valid?</h4>
        <button type="button" onClick={deleteOneApp}>
          Delete
        </button>
      </div>
    );
  } else {
    deleteBtn = <div />;
  }

  let creatorUser;
  if (app.creator && app.editors.length < 1) {
    creatorUser = (
      <div className="notes">
        This page was added by
        {' '}
        {app.creator.username}
        .
      </div>
    );
  } else {
    creatorUser = null;
  }

  let lastEditUser;
  if (app.editors.length < 1 || app.editors[app.editors.length - 1].username == null) {
    lastEditUser = null;
  } else {
    lastEditUser = (
      <div className="notes">
        This page was last updated by
        {' '}
        {app.editors[app.editors.length - 1].username}
        .
      </div>
    );
  }

  return (
    <main id="appDetail">

      <div className="appIntro">
        <div className="appInfo">
          <img src={app.logo || appIconPlaceholder} alt="" />
          <div>
            <h2>{app.name}</h2>
            <h4>{app.category.name}</h4>
            <a target="_blank" rel="noreferrer" href={app.website ? `${app.website}` : '/'}>
              <span>⎋</span>
              Visit official website
            </a>
          </div>
        </div>
        <div className="ratingApp">
          <h5>Rating</h5>
          <p>
            {avrRating }
            {' '}
            <span>✦</span>
          </p>
        </div>
      </div>

      <div className="labels-container">
        {wishListBtns}
        {editLinkBtn}
      </div>

      <div className="description">
        <h3>Description</h3>
        <p>{app.description}</p>
        <div>
          <h4>Available devices:</h4>
          <ul>{app.device && app.device.map((device, index) => <li key={index}>{device}</li>)}</ul>
        </div>
        {ratingBtns}
        <CommentsContainer userId={userId} app={app} />
        {deleteBtn}
      </div>
      <div>
        {creatorUser}
        {lastEditUser}
      </div>
    </main>
  );
}

export default AppDetail;
