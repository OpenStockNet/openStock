import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import AppDetail from "./components/AppDetail";
import NewApp from "./components/NewApp";
import WishList from "./components/WishList";

class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <Navbar user={this.state.user} />
        </header>

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/alternatives" component={AlternativesPage} / */}>
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} history={props.history} />} //{...props}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} history={props.history} />} //{...props}
          />
          <Route
            exact
            path="/apps/new"
            render={(props) => <NewApp user={this.state.user} history={props.history} />} //{...props}
          />
          <Route
            exact
            path="/apps/:id"
            render={(props) => <AppDetail user={this.state.user} match={props.match} />} //{...props}
          />
          <Route
            exact
            path="/apps/wishlist/:id"
            render={(props) => <WishList user={this.state.user} match={props.match} />} //{...props} 
          />
        </Switch>
      </div>
    );
  }
}

export default App;
