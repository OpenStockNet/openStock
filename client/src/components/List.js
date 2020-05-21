import React, { Component } from "react";
import { Link } from "react-router-dom";

class List extends Component {
  state = {};

  render() {
    const apps = this.props.appsFiltered.map((app) => {
      return (
        <div key={app._id} className="appCard">
          <Link to={`/apps/${app._id}`}>
            <img src={app.logo} />
          </Link>
          <div>
            <Link to={`/apps/${app._id}`}>
              <h2>{app.name}</h2>
            </Link>
            <p>{app.category.name}</p>
          </div>
        </div>
      );
    });
    return (
      <section id="listContainer">
        {this.props.appsFiltered.length === 0 && (
          <h4>Sorry, we haven't found any alternative app 😧. Try something different.</h4>
        )}
        {apps}
      </section>
    );
  }
}

export default List;
