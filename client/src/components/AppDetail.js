import dummyApps from "./dummyApps.json";
import { fetchAllApps } from '../services/app'
import { getAverageRating } from '../services/rating'

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import List from "./List";

class AppDetail extends Component {
  state = {
    app: {},
    rating: 0,
  };

  componentDidMount() {
    //instead of fetching all apps, would be better fetch only one app
    //if have time,create an endpoint for it
    const appId = this.props.match.params.id;
    
    fetchAllApps()
    .then((apps) => {
      const app = apps.find((app) => {
        return app._id === appId;
      })

      this.setState({
        app: app,
      });
      console.log("Log the app object:", this.state.app);
      console.log("Log the app category name:", this.state.app.category.name);
    });

    //here pass param appId to API call in rating.js
    //calls function getAverageRating() with appId param from rating.js
    getAverageRating(appId)
    .then((averageRating) => {
      this.setState({
        rating: averageRating
      })
    })
  }
  

  render() {
    return (
      <div>
        <div>
          <img src={this.state.app.logo} />
          <h2>{this.state.app.name}</h2>
          {/* <h4>{this.state.app.category.name}</h4> */}
          <a target="_blank" href={`${this.state.app.website}`}>
            Visit oficial website
          </a>
        </div>

        <h3>Description</h3>
        <p>{this.state.app.description}</p>

        <div>
          <h5>Available devices:</h5>
          <p>{this.state.app.device}</p>
          <p></p>
        </div>
        <h3>Rating</h3>
        <p>{this.state.rating}</p>
      </div>
    );
  }
}

export default AppDetail;
