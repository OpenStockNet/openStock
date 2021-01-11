import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import About from './components/About';

import AppDetail from './components/AppDetail';
import NewApp from './components/NewApp';
import WishList from './components/WishList';
import EditApp from './components/EditApp';

import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';
import Popover from './components/Popover';

import './App.css';

import { SharedSnackbarProvider } from './components/SharedSnackbar.context';
import { SharedDialogProvider } from './components/SharedDialog.context';

function App(props) {
  const [user, setUser] = useState(props.user);
  const [sideDrawerOpen, setsideDrawerOpen] = useState(false);

  const handleDrawerToggleClick = () => {
    setsideDrawerOpen(!sideDrawerOpen);
  }

  const handleBackdropClick = () => {
    setsideDrawerOpen(false);
  }

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
        <Popover />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={setUser} history={props.history} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={setUser} history={props.history} />} // {...props}
          />
          <Route
            exact
            path="/apps/new"
            render={(props) => <NewApp user={user} history={props.history} />} // {...props}
          />
          <Route
            exact
            path="/apps/:id"
            render={(props) => <AppDetail user={user} match={props.match} history={props.history}/>} // {...props}
          />
          <Route
            exact
            path="/apps/:id/edit"
            render={(props) => <EditApp user={user} match={props.match} history={props.history} />} // {...props}
          />
          <Route
            exact
            path="/apps/wishlist/:id"
            render={(props) => <WishList user={user}  match={props.match} />} // {...props}
          />
          <Route 
            exact
            path="/about"
            component={About}
          />
        </Switch>
        
        </SharedSnackbarProvider>
        </SharedDialogProvider>
      </div>
    );
  
}

export default App;
