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

class App extends Component {
  state = {
    user: this.props.user,
    /* appsData: dummyApps, */
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
          <Route exact path="/alternatives" component={AlternativesPage} />
          <Route exact path="/:category/:name" component={AppDetail} />
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
        </Switch>
        {/* <HomePage alternatives={this.state.alternatives} /> */}
        {/* <ProductDetail alternatives={this.state.alternatives} /> */}
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Navbar />

//       {/* <Route exact path="/" component={} />
//       <Route exact path="/browse" component={} />
//       <Route exact path="/alternatives" component={} /> */}
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
