import React, { Component } from "react";
import { Link } from "react-router-dom";
import appIconPlaceholder from "../app-icon-placeholder.svg";

class List extends Component {
  componentDidUpdate(prevprops) {
    if (prevprops.query !== this.props.query) {
      this.getApp();
    }
  }
  getApp = () => {
    if (!this.props.query) return;
    const filteredApp = this.props.appsList.filter((searchApp) => {
      return searchApp.name.toLowerCase().includes(this.props.query.toLowerCase());
    });
    this.props.setApps(filteredApp);
  };

  render() {
    if (!this.props.appsFiltered) return <div />;
    const apps = this.props.appsFiltered.map((app) => {
      return (
        <div key={app._id} className="appCard">
          <Link to={`/apps/${app._id}`}>
            <img src={app.logo || appIconPlaceholder} />
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
    console.log("HERE appsFiltered: ", this.props.appsFiltered);
    return (
      <section id="listContainer">
        {/* <h3>{this.props.appsFiltered.category.name}</h3> */}
        {this.props.appsFiltered.length === 0 && (
          <h4>Sorry, we haven't found any alternative app 😧. Try something different.</h4>
        )}
        {apps}
      </section>
    );
  }
}

export default List;
