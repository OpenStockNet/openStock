import React, { Component } from "react";
import ReactDOM from "react-dom";

class AppDetail extends Component {
  state = {};

  render() {
    const apps = this.props.alternatives.map((app) => {
      return (
        <div>
          <h2>{this.props.app.name}</h2>
          <h3>Description</h3>
          <p>{this.props.app.description}</p>
        </div>
      );
    });
    return <div>{apps}</div>;
  }
}

export default AppDetail;
