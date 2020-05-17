import dummyApps from "./dummyApps.json";
import dummyCategories from "./dummyCategories.json";

import React, { Component } from "react";
import Categories from "./Categories";
import Alternatives from "./Alternatives";
import List from "./List";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Find the right software for you and protect your privacy</h2>
        <Categories />

        <List />
      </div>
    );
  }
}

export default HomePage;
