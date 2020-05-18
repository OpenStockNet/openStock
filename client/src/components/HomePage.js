import dummyApps from "./dummyApps.json";
import dummyCategories from "./dummyCategories.json";

import React, { Component } from "react";
import Categories from "./Categories";
import List from "./List";

class HomePage extends Component {
  state = {
    category: dummyCategories,
    appsList: dummyApps,
    appsFiltered: dummyApps,
  };

  setCategory = (category) => {
    this.setState({
      category: category,
    });
  };

  setApps = (newApps) => {
    this.setState({
      appsFiltered: newApps,
    });
  };

  render() {
    return (
      <div>
        <h2>Find the right software for you and protect your privacy</h2>
        <Categories setApps={this.setApps} appsList={this.state.appsList} category={this.state.category} />
        <List appsFiltered={this.state.appsFiltered} />
      </div>
    );
  }
}

export default HomePage;
