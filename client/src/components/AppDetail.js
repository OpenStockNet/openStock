import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchApp, deleteApp, addWishApp, removeWishApp,
} from '../services/app';
import { getAverageRating, rateApp } from '../services/rating';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import TextArea from './TextArea';
import Loader from './Loader';
// import Loader from './Loader_copy';
// import Modal from './components/popupModal';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './AppDetail.scss';
import { CloudStorageIcon } from '../images';

function AppDetailHook(props) {
  const [app, setApp] = useState(null);
  const [avrRating, setAvrRating] = useState(0);
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
      color: '#c5b79f',
      backgroundColor: '#31708f',
      boxShadow: "10px 10px 5px 0px  rgba(26, 24, 41, 0.7)",
    },
    // root: {
    //   "& .MuiPaper-root": {
        
    //   }
    // }
  }));

  const classes = useStyles();


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
        alert(`Thank you for rating ${app.name}.`); // replace it with a modal module
        
        updateAvrRating(appId);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? 'simple-popover' : null;

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
        updateAppDetails();
        setOpen(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // remove app from wish list
  const removeFromWishList = (event) => {
    removeWishApp(appId, userId)
      .then(() => {
        updateAppDetails();
        setOpen(true);
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

  const wishListBtn = (
    <div>
    <button type="button" key={props.user._id} onClick={addToWishList} className="small">
      + &nbsp; Wish list
    </button>
    <Popover
      anchorReference="anchorPosition"
      anchorPosition={{ top: 80,  left:500}}
      id={id}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'bottom',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'bottom',
      }}
    >
    <Typography className={classes.typography}>{app.name} is removed from the list!</Typography>
  </Popover>
  </div>
  );

  const removeWishListBtn = (
    <div>
      <button type="button" key={props.user._id} onClick={removeFromWishList} className="small">
        Saved
      </button>
      <Popover
      anchorReference="anchorPosition"
      anchorPosition={{ top: 80, left:500 }}
      id={id}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'bottom',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'bottom',
      }}
    >
      
    <Typography className={classes.typography}>{app.name} is saved to the list!</Typography>
    </Popover>
  </div>
  );

  const wishListBtns = (
    app.wishUser.includes(props.user._id) ? removeWishListBtn : wishListBtn
  );

  const editLinkBtn = (
    <Link to={`/apps/edit/${appId}`} className="small" id="linkBtn">
      <span style={{ fontWeight: '800' }} id="linkBtn">&#10000; &nbsp; &nbsp; Edit</span>
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
        {/* {props.user ? wishListBtns : null} */}
        {wishListBtns}
        {props.user ? editLinkBtn : null}
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
