import dummyApps from "./dummyApps.json";
import { fetchAllApps } from '../services/app'

import React, { Component } from "react";
import ReactDOM from "react-dom";

class AppDetail extends Component {
  state = {
    app: {},
  };

  componentDidMount() {
    //instead of fetching all apps, would be better fetch only one app
    //if have time,create an endpoint for it
    fetchAllApps()
    .then((apps) => {
      const app = apps.find((app) => {
        return app._id === this.props.match.params.id;
      })

      this.setState({
        app: app
      })
    });
  }

  render() {
    // const appName = this.props.match.params.name;
    // console.log(appName);
    // const appInfo = dummyApps.find((app) => {
    //   return app.name === appName;
    // });
    // console.log(appInfo);

    return (
      <div>
        <h2>{this.state.app.name}</h2>
        <h3>Description</h3>
        <p>{this.state.app.description}</p>
      </div>
    );
  }
}

export default AppDetail;
