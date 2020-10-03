import React, { useState, useEffect } from 'react';
import {
  fetchApp, deleteApp, addWishApp, removeWishApp,
} from '../services/app';
import { getAverageRating, rateApp } from '../services/rating';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import TextArea from './TextArea';
import Loader from './Loader';

function AppDetailHook(props) {
  const [app, setApp] = useState(null);
  const [avrRating, setAvrRating] = useState(0);

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

  const submitRating = (event) => {
    const ratingValue = event.target.value;

    rateApp(ratingValue, appId)
      .then(() => {
        alert(`Thank you for rating ${app.name}.`);
        updateAvrRating(appId);
      })
      .catch((error) => {
        alert(error.message);
      });
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

  // delete app
  const deleteOneApp = () => {
    deleteApp(appId)
      .then(() => {
        alert(`You successfully deleted ${app.name}.`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // if there's a need to change only on frontend, you shoud not mutate an object in "state",
  // instead: make a copy, modify copy, and replace original object with copy

  // add app to wish list
  const addToWishList = () => {
    addWishApp(appId, userId)
      .then(() => {
        alert(`${app.name} is added to wish list!`);
        updateAppDetails();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // remove app from wish list
  const removeFromWishList = () => {
    removeWishApp(appId, userId)
      .then(() => {
        alert(`${app.name} is removed from wish list!`);
        updateAppDetails();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const ratingBtns = (
    <div>
      <h4>Rate this app</h4>
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
  );

  // if (!app) return <div />;
  if (!app) return <Loader />;

  const deleteBtn = (
    <div>
      <h4>This app is not valid anymore?</h4>
      <button type="button" onClick={deleteOneApp}>Delete</button>
    </div>
  );

  const wishListBtn = (
    <button type="button" key={props.user._id} onClick={addToWishList} className="small">
      + &nbsp; Wish list
    </button>
  );

  const removeWishListBtn = (
    <button type="button" key={props.user._id} onClick={removeFromWishList} className="small">
      saved
    </button>
  );

  const wishListBtns = (
    app.wishUser.includes(props.user._id) ? removeWishListBtn : wishListBtn
  );

  return (
    <main id="appDetail">
      <div className="appIntro">
        <div className="appInfo">
          <img src={app.logo || appIconPlaceholder} alt="" />
          <div>
            <h2>{app.name}</h2>
            <h4>{app.category.name}</h4>
            <a target="_blank" href={app.website ? `${app.website}` : '/'}>
              <span>⎋</span>
              Visit official website
            </a>
          </div>
        </div>
        <div className="ratingApp">
          <h5>Rating</h5>
          <p>
            {avrRating || 'Not yet rated'}
            {' '}
            <span>✦</span>
          </p>
        </div>
      </div>

      <div className="labels-container">
        {props.user ? wishListBtns : null}
      </div>

      <div className="description">
        <h3>Description</h3>
        <p>{app.description}</p>

        <div>
          <h4>Available devices:</h4>
          <ul>{app.device && app.device.map((device, index) => <li key={index}>{device}</li>)}</ul>
        </div>

        <div id="rateApp">{props.user ? ratingBtns : null}</div>
        <TextArea userId={userId} app={app} />
        <div id="rateApp">{props.user._id && app.creator && props.user._id === app.creator ? deleteBtn : null}</div>
      </div>
    </main>
  );
}

export default AppDetailHook;
