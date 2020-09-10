import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

//import AppDetail from "./components/AppDetail";
import AppDetailHook from "./components/AppDetail_hook";
import NewApp from "./components/NewApp";
//import WishList from "./components/WishList";
import WishListHook from "./components/WishList_hook"

import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";


class App extends Component {
  state = {
    user: this.props.user,
    sideDrawerOpen: false,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  handleDrawerToggleClick = () => {
    this.setState((prevState)=> {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  }

  // click on backdrop to close side drawer
  handleBackdropClick = () => {
    this.setState({sideDrawerOpen:false});
  }
  
  render() {
    
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.handleBackdropClick}/>
    }

    return (
      <div className="App">
        <header>
          <Navbar user={this.state.user} handleDrawerToggleClick={this.handleDrawerToggleClick}/>
          {/* side drawer always open, add animation*/}
          <SideDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}
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
            render={(props) => <AppDetailHook user={this.state.user} match={props.match} />} //{...props}
          />
          <Route
            exact
            path="/apps/wishlist/:id"
            render={(props) => <WishListHook user={this.state.user} match={props.match} />} //{...props} 
          />
        </Switch>
      </div>
    );
  }
}

export default App;
