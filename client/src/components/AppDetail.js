import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchApp, deleteApp, addWishApp, removeWishApp,
} from '../services/app';
import { getAverageRating, rateApp } from '../services/rating';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import TextArea from './TextArea';
import Loader from './Loader';

import iconPlusSign from '../images/iconPlusSign.svg'
import iconApproved from '../images/iconApproved.svg'
import iconPencilEdit from '../images/iconPencilEdit.svg'

import PopupModal from './PopupModal';

import './AppDetail.scss';
// import { CloudStorageIcon } from '../images';

function AppDetailHook(props) {
  const [app, setApp] = useState(null);
  const [avrRating, setAvrRating] = useState(0);
  // popover
  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(null);

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

  // popover logics
  const handleClose = () => {
    setOpen(false);
  };

  const confirm = open ? 'simple-popover' : null;

  const submitRating = (event) => {
    const ratingValue = event.target.value;

    rateApp(ratingValue, appId)
      .then(() => {
        updateAvrRating(appId);
        updateAppDetails();
        setOpenMsg(`Thank you for rating ${app.name}!`);
        setOpen(true);
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
        props.history.push('/');
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
        updateAppDetails();
        setOpenMsg(`${app.name} is added to wish list!`);
        setOpen(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // remove app from wish list
  const removeFromWishList = () => {
    removeWishApp(appId, userId)
      .then(() => {
        updateAppDetails();
        setOpenMsg(`${app.name} is removed from wish list!`);
        setOpen(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
        {/* + Wish list  */}
        {/* &#9825; */}
        <img src={iconPlusSign} alt="" className='icon-btns'/>
      </button>
   
  );

  const removeWishListBtn = (
    
      <button type="button" key={props.user._id} onClick={removeFromWishList} id="small">
        {/* Saved  */}
        {/* &#9829; */}
      {/* <img src={iconBookmark} alt="" /> */}
      <img src={iconApproved} alt="" className='icon-btns'/>
      </button>
    
  );

  const wishListBtns = (
    app.wishUser.includes(props.user._id) ? removeWishListBtn : wishListBtn
  );

  const editLinkBtn = (
    <Link to={`/apps/edit/${appId}`} id="small" >
      {/* <span id="linkBtn">&#10000; </span> */}
      <img src={iconPencilEdit} alt="" className='icon-btns'/>
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
  if (app.editors.length < 1) {
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
      <PopupModal
        id={confirm}
        open={open}
        handleClose={handleClose}
        message={openMsg}
      />
      <div className="appIntro">
        {/* <Loader /> */}
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
        {props.user ? wishListBtns : null}
        {props.user ? editLinkBtn : null}
      </div>

      <div className="description">
        <h3>Description</h3>
        <p>{app.description}</p>

        <div>
          <h4>Available devices:</h4>
          <ul>{app.device && app.device.map((device, index) => <li key={index}>{device}</li>)}</ul>
        </div>
        {props.user ? ratingBtns : null}
        <TextArea userId={userId} app={app} />
        {deleteBtn}
      </div>
      <div>
        {creatorUser}
        {lastEditUser}
      </div>

    </main>
  );
}

export default AppDetailHook;
