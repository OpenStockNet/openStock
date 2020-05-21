import dummyApps from "./dummyApps.json";
import { fetchAllApps } from "../services/app";
import { getAverageRating, rateApp } from "../services/rating";
import appIconPlaceholder from "../app-icon-placeholder.svg";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import List from "./List";

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

    rateApp(ratingValue, ratingAppId);
  };

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

  render() {
    const ratingBtns = (
      <div>
        <h3>Rate this app</h3>
        <button value={1} onClick={this.submitRating}>
          &#x272d;
        </button>
        <button value={2} onClick={this.submitRating}>
          &#x272d; &#x272d;
        </button>
        <button value={3} onClick={this.submitRating}>
          &#x272d; &#x272d; &#x272d;
        </button>
        <button value={4} onClick={this.submitRating}>
          &#x272d; &#x272d; &#x272d; &#x272d;
        </button>
        <button value={5} onClick={this.submitRating}>
          &#x272d; &#x272d; &#x272d; &#x272d; &#x272d;
        </button>
      </div>
    );

    if (!this.state.app) return <div />;

    return (
      <div>
        <div>
          <img src={this.state.app.logo || appIconPlaceholder} />
          <h2>{this.state.app.name}</h2>
          <h4>{this.state.app.category.name}</h4>
          <a target="_blank" href={`${this.state.app.website}`}>
            Visit official website
          </a>
        </div>

        <h3>Description</h3>
        <p>{this.state.app.description}</p>

        <div>
          <h5>Available devices:</h5>
          {this.state.app.device &&
            this.state.app.device.map((device) => (
              <ul key={device}>
                <li>{device}</li>
              </ul>
            ))}
        </div>

        <h3>Rating</h3>
        <p>
          {this.state.avrRating || 'Not yet rated'}
          <img className="star" src="../iconfinder_full.png" width="20px" />
        </p>
        <div>{this.props.user ? ratingBtns : null}</div>
      </div>
    );
  }
}

export default AppDetail;
