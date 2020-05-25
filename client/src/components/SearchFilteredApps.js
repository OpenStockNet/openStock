import React, { Component } from "react";
import { fetchAllApps } from "../services/app";

class SearchFilteredApps extends Component {
  state = {
    apps: null,
    app: null,
  };

  componentDidMount() {
    fetchAllApps().then((apps) => {
      this.setState({
        apps: apps,
      });
    });
  }
  componentDidUpdate(prevprops) {
    if (prevprops.query !== this.props.query) {
      this.getApp();
    }
  }
  getApp = () => {
    console.log(this.state);
    const filteredApp = this.state.apps.filter((searchApp) => {
      return searchApp.name.toLowerCase().includes(this.props.query.toLowerCase());
    });
    console.log(this.props.query);
    this.setState({
      app: filteredApp,
    });
  };

  render() {
    if (!this.state.app) return <div />;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.app.map((searchApp) => {
              return (
                <tr key={searchApp._id}>
                  <td>
                    <img src={searchApp.logo} height="100px" alt={searchApp.name} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchFilteredApps;
