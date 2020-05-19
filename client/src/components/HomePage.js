import dummyApps from "./dummyApps.json";
import dummyCategories from "./dummyCategories.json";
import { fetchAllCategories } from "../services/category";
import { fetchAllApps } from "../services/app";

import React, { Component } from "react";
import Categories from "./Categories";
import List from "./List";

class HomePage extends Component {
  state = {
    categories: [],
    appsList: [],
    appsFiltered: [],
  };

  componentDidMount() {
    fetchAllCategories().then((categories) => {
      this.setState({
        categories: categories,
      });
    });

    fetchAllApps().then((apps) => {
      this.setState({
        appsList: apps,
        appsFiltered: apps,
      });
    });
  }

  setApps = (newApps) => {
    this.setState({
      appsFiltered: newApps,
    });
  };

  render() {
    return (
      <div>
        <h2>Find the right software for you and protect your privacy</h2>
        <Categories setApps={this.setApps} appsList={this.state.appsList} category={this.state.categories} />
        <List appsFiltered={this.state.appsFiltered} />
      </div>
    );
  }
}

export default HomePage;
