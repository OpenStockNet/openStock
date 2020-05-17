import dummyApps from "./dummyApps.json";

import React, { Component } from "react";
import ReactDOM from "react-dom";

class AppDetail extends Component {
  state = {};

  render() {
    const appId = this.props.match.params._id;
    const appInfo = dummyApps.find((app) => {
      return app._id === appId;
    });

    return (
      <div>
        <h2>{appInfo.name}</h2>
        <h3>Description</h3>
        <p>{appInfo.description}</p>
      </div>
    );
  }
}

export default AppDetail;
