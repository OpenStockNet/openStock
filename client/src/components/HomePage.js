import dummyData from "./dummyData.json";

import React, { Component } from "react";
import Categories from "./Categories";
import Alternatives from "./Alternatives";
import List from "./List";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h2>Find the right software for you and protect your privacy</h2>
        <Categories />

        {/* {this.props.alternatives.length === 0 && <h4>No alternatives here</h4>} */}

        <List apps={dummyData} />
      </div>
    );
  }
}

export default HomePage;
