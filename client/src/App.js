import React, { Fragment, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";

import { Route, Redirect } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
/* import ProductDetail from "./components/ProductDetail.js";
 */
const dummyApps = [
  {
    _id: 1,
    name: "AppName 1",
    category: "Browser",
    description: "This is a description that will be longer for sure 1.",
  },
  {
    _id: 2,
    name: "AppName 2",
    category: "Search Engine",
    description: "This is a description that will be longer for sure 2.",
  },
  {
    _id: 3,
    name: "AppName 3",
    category: "Messenger",
    description: "This is a description that will be longer for sure 3.",
  },
  {
    _id: 4,
    name: "AppName 4",
    category: "E-Mail Provider",
    description: "This is a description that will be longer for sure 4.",
  },
  {
    _id: 5,
    name: "AppName 5",
    category: "Online Streaming",
    description: "This is a description that will be longer for sure 5.",
  },
  {
    _id: 6,
    name: "AppName 6",
    category: "Navigation",
    description: "This is a description that will be longer for sure 6.",
  },
];

class App extends Component {
  state = {
    user: this.props.user,
    alternatives: dummyApps,
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
        <HomePage alternatives={this.state.alternatives} />
        {/* <ProductDetail alternatives={this.state.alternatives} /> */}

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
