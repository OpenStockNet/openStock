import React, { Component } from "react";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <div>
      {props.apps.map((app) => {
        return (
          <div key={app._id}>
            <Link to={`/${app.category}/${app.name}`}>{app.name}</Link>
            <p>{app.category}</p>
          </div>
        );
      })}
      <h1>Hola</h1>
    </div>
  );
};

/* class List extends Component {
  render() {
    const data = this.props.apps.map((app) => {
      return (
        <div key={this.app._id}>
          <Link to={`/${app.name}`}>{app.name}</Link>
          <p>{app.category}</p>
        </div>
      );
    });
    return <div>{data}</div>;
  }
} */

export default List;

/* class List extends Component {
  state = {};

  render() {
    const alternatives = this.props.alternatives.map((alternative) => {
      return (
        <div key={alternative._id}>
          <h2>{alternative.name}</h2>
          <p>{alternative.category}</p>
        </div>
      );
    });
    return <div>{alternatives}</div>;
  }
}

export default List; */
