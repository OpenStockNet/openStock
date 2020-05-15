import React, { Component } from "react";
import List from "./List";

class HomePage extends Component {
  /* state = {
    alternatives: dummyApps,
  }; */
  render() {
    return (
      <div>
        <h1>H1 from HomePage</h1>
        {this.props.alternatives.length === 0 && <h4>No alternatives here</h4>}
        <List alternatives={this.props.alternatives} />
      </div>
    );
  }
  /* render() {
    const dummies = this.props.dummies.map((app) => {
      return (
        <div>
          <h3>Hello</h3>
          <h4>There</h4>

          <div key={app._id}>
            <h2>{app.name}</h2>
            <p>{app.category}</p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1>H1 from HomePage</h1>
        {dummies}
      </div>
    );
  } */
}

export default HomePage;
