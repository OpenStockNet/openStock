import { fetchAllApps, deleteApp  } from "../services/app";
import { getAverageRating, rateApp } from "../services/rating";

import appIconPlaceholder from "../app-icon-placeholder.svg";

import React, { Component } from "react";
import ReactDOM from "react-dom";

class AppDetail extends Component {
  state = {
    app: null,
    avrRating: 0,
  };

  componentDidMount() {
    //instead of fetching all apps, would be better fetch only one app
    //if have time,create an endpoint for it

    const appId = this.props.match.params.id;

    fetchAllApps()
      .then((apps) => {
        const app = apps.find((app) => {
          return app._id === appId;
        });

        this.setState({
          app: app,
        });
      })
      .catch((error) => {
        alert(error.message);
      });

    //here pass param appId to API call in rating.js
    //calls function getAverageRating() with appId param from rating.js
    getAverageRating(appId)
      .then((averageRating) => {
        this.setState({
          avrRating: averageRating,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  //.value is value attribute on button elem
  submitRating = (event) => {
    const ratingValue = event.target.value;
    const ratingAppId = this.props.match.params.id;

    rateApp(ratingValue, ratingAppId)
      .then(() => {
        alert(`Thank you for rating ${this.state.app.name}.`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //delete app
  deleteOneApp = (event) => {
    const deletedAppId = this.props.match.params.id;

    deleteApp(deletedAppId)
      .then(() => {
        alert(`You successfully deleted ${this.state.app.name}.`)
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  render() {
    const ratingBtns = (
      <div>
        <h4>Rate this app</h4>
        <button value={1} onClick={this.submitRating}>
          1 ✦
        </button>
        <button value={2} onClick={this.submitRating}>
          2 ✦ ✦
        </button>
        <button value={3} onClick={this.submitRating}>
          3 ✦ ✦ ✦
        </button>
        <button value={4} onClick={this.submitRating}>
          4 ✦ ✦ ✦ ✦
        </button>
        <button value={5} onClick={this.submitRating}>
          5 ✦ ✦ ✦ ✦ ✦
        </button>
      </div>
    );

    if (!this.state.app) return <div />;

    const deleteBtn = (
      <div>
        <h4>This app is not valid anymore?</h4>
        <button onClick={this.deleteOneApp}>Delete</button>
      </div>
    );

    return (
      <main id="appDetail">
        <div className="appIntro">
          <div className="appInfo">
            <img src={this.state.app.logo || appIconPlaceholder} />
            <div>
              <h2>{this.state.app.name}</h2>
              <h4>{this.state.app.category.name}</h4>
              <a target="_blank" href={`${this.state.app.website}`}>
                <span>⎋</span>Visit official website
              </a>
            </div>
          </div>
          <div className="ratingApp">
            <h5>Rating</h5>
            <p>
              {this.state.avrRating || "Not yet rated"} <span>✦</span>
              {/* 
              <img className="star" src="../iconfinder_full.png" /> */}
            </p>
          </div>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>{this.state.app.description}</p>

          <div>
            <h4>Available devices:</h4>
            <ul>{this.state.app.device && this.state.app.device.map((device) => <li>{device}</li>)}</ul>
          </div>

          <div id="rateApp">{this.props.user ? ratingBtns : null}</div>
          <div id="rateApp">{this.props.user._id != undefined && this.state.app.creator != undefined && this.props.user._id == this.state.app.creator ? deleteBtn : null}</div>
        </div>
      </main>
    );
  }
}

export default AppDetail;
