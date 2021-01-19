import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { fetchLogInUser } from './services/auth';

import Navbar from './components/Navbar';
import SignupContainer from './components/SignupContainer';
import LoginContainer from './components/LoginContainer';
import HomePageContainer from './components/HomePageContainer';
import About from './components/About';

import AppDetailsContainer from './components/AppDetailsContainer';
import NewAppContainer from './components/NewAppContainer';
import WishListContainer from './components/WishListContainer';
import EditAppContainer from './components/EditAppContainer';

import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';
import Popover from './components/Popover';
import Footer from './components/Footer';

import './App.scss';

import { SharedSnackbarProvider } from './components/SharedSnackbar.context';
import { SharedDialogProvider } from './components/SharedDialog.context';

function App() {
  const [user, setUser] = useState('');
  const [sideDrawerOpen, setsideDrawerOpen] = useState(false);

  useEffect(() => {
    fetchLogInUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleDrawerToggleClick = () => {
    setsideDrawerOpen(!sideDrawerOpen);
  };

  const handleBackdropClick = () => {
    setsideDrawerOpen(false);
  };

  let backdrop;
  if (sideDrawerOpen) {
    backdrop = <Backdrop click={handleBackdropClick} />;
  }

  return (
    <div className="App">
      <SharedDialogProvider>
        <SharedSnackbarProvider>

          <header>
            <Navbar user={user} handleDrawerToggleClick={handleDrawerToggleClick} />
            {/* side drawer always open, add animation */}
            <SideDrawer user={user} show={sideDrawerOpen} click={handleBackdropClick} />
            {backdrop}
          </header>
          {/* <Popover /> */}
          <Switch>
            <Route exact path="/" component={HomePageContainer} />
            <Route
              exact
              path="/signup"
              render={(props) => <SignupContainer setUser={setUser} history={props.history} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <LoginContainer setUser={setUser} history={props.history} />}
            />
            <Route
              exact
              path="/apps/new"
              render={(props) => <NewAppContainer user={user} history={props.history} />}
            />
            <Route
              exact
              path="/apps/:id"
              render={(props) => <AppDetailsContainer user={user} match={props.match} history={props.history} />}
            />
            <Route
              exact
              path="/apps/:id/edit"
              render={(props) => <EditAppContainer user={user} match={props.match} history={props.history} />}
            />
            <Route
              exact
              path="/apps/wishlist/:id"
              render={() => <WishListContainer user={user} />}
            />
            <Route
              exact
              path="/about"
              component={About}
            />
          </Switch>
          <Footer />
        </SharedSnackbarProvider>
      </SharedDialogProvider>
    </div>
  );
}

export default App;
