import React, { useState, useEffect } from "react";
import { fetchApp, deleteApp, addWishApp  } from "../services/app";
import { getAverageRating, rateApp } from "../services/rating";
import appIconPlaceholder from "../app-icon-placeholder.svg";


function AppDetailHook (props) {
  const [app, setApp] = useState(null);
  const [avrRating, setAvrRating] = useState(0);

  const appId = props.match.params.id;

  useEffect(() => {
    
    fetchApp(appId)
      .then((theApp) => {
        setApp(theApp);
      })
      .catch((error) => {
        alert(error.message);
      });

    //calls function getAverageRating() with appId param from rating.js
    getAverageRating(appId)
    .then((averageRating) => {
      setAvrRating(averageRating);
    })
    .catch((error) => {
      alert(error.message);
    });

  },[appId, avrRating])

  const submitRating = (event) => {
    const ratingValue = event.target.value;
    const ratingAppId = props.match.params.id;

    rateApp(ratingValue, ratingAppId)
      .then(() => {
        alert(`Thank you for rating ${app.name}.`);
        updateAvrRating(appId);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //update average rating without refreshing page
  const updateAvrRating = (appId) => {
    getAverageRating(appId)
    .then((averageRating) => {
      setAvrRating(averageRating);
      console.log(averageRating)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  //delete app
  const deleteOneApp = () => {
    const deletedAppId = props.match.params.id;

    deleteApp(deletedAppId)
      .then(() => {
        alert(`You successfully deleted ${app.name}.`)
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  //add app to wish list
  const addToWishList = () => {
    const wishAppId = props.match.params.id
    const userId = props.user._id

    addWishApp(wishAppId, userId)
      .then(() => {
        alert('Added to wish list!');
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  const ratingBtns = (
      <div>
        <h4>Rate this app</h4>
        <button value={1} onClick={submitRating}>
          1 ✦
        </button>
        <button value={2} onClick={submitRating}>
          2 ✦ ✦
        </button>
        <button value={3} onClick={submitRating}>
          3 ✦ ✦ ✦
        </button>
        <button value={4} onClick={submitRating}>
          4 ✦ ✦ ✦ ✦
        </button>
        <button value={5} onClick={submitRating}>
          5 ✦ ✦ ✦ ✦ ✦
        </button>
      </div>
    );

    if (!app) return <div />;

  const deleteBtn = (
    <div>
      <h4>This app is not valid anymore?</h4>
      <button onClick={deleteOneApp}>Delete</button>
    </div>
  );

  const wishListBtn = (
    <div>
        <button key={props.user._id} onClick={addToWishList}  className="btnCategories">
        <h3>+ Wish list  <span>📑</span></h3>
        </button>
    </div>
  )

      return (
        <main id="appDetail">
          <div className="appIntro">
            <div className="appInfo">
              <img src={app.logo || appIconPlaceholder} alt=""/>
              <div>
                <h2>{app.name}</h2>
                <h4>{app.category.name}</h4>
                <a target="_blank" href={app.website?`${app.website}`:`/`}>
                  <span>⎋</span>Visit official website
                </a>
              </div>
            </div>
            <div className="ratingApp">
              <h5>Rating</h5>
              <p>
                {avrRating || "Not yet rated"} <span>✦</span>
              </p>
            </div>
          </div>
          <div className="description">
            <h3>Description</h3>
            <p>{app.description}</p>
  
            <div>
              <h4>Available devices:</h4>
              <ul>{app.device && app.device.map((device, index) => <li key={index}>{device}</li>)}</ul>
            </div>
  
            <div id="rateApp">{props.user ? ratingBtns : null}</div>
            <div id="rateApp">{props.user._id && app.creator && props.user._id === app.creator ? deleteBtn : null}</div>
            <div id="rateApp">{props.user ? wishListBtn : null}</div>
          </div>
        </main>
      );
    }
  
    
export default AppDetailHook;
