import { fetchAllCategories } from "../services/category";
import { fetchAllApps } from "../services/app";

import React, { Component } from "react";
import Search from "./Search";
import Categories from "./Categories";
import List from "./List";

class HomePage extends Component {
  state = {
    categories: [],
    appsList: [],
    appsFiltered: [],
    query: "",
  };

  setQuery = (query) => {
    this.setState({
      query: query,
    });
  };

  componentDidMount() {
    fetchAllCategories()
    .then((categories) => {
      this.setState({
        categories: categories,
      });
    })
    .catch((error) => {
      alert(error.message);
    });

    fetchAllApps()
    .then((apps) => {
      this.setState({
        appsList: apps,
        appsFiltered: apps,
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  setApps = (newApps) => {
    this.setState({
      appsFiltered: newApps,
    });
  };

  render() {
    return (
      <main className="">
        <h2>Find the right software to protect your privacy</h2>
        <Search setQuery={this.setQuery} query={this.state.query} />
        <Categories
          setApps={this.setApps}
          setQuery={this.setQuery}
          appsList={this.state.appsList}
          category={this.state.categories}
        />
        <List
          appsList={this.state.appsList}
          setApps={this.setApps}
          appsFiltered={this.state.appsFiltered}
          query={this.state.query}
        />
      </main>
    );
  }
}

export default HomePage;
