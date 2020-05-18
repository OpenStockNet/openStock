import React, { Fragment, Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import AlternativesPage from "./components/AlternativesPage";
import AppDetail from "./components/AppDetail";
import NewApp from "./components/NewApp";


class App extends Component {
  state = {
    user: this.props.user,
  };

  //user parameter comes from handleSUbmit() where I call the function
  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar />

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
            render={(props) => <NewApp history={props.history} />} //{...props}
          />
          <Route exact path="/apps/:id" component={AppDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
