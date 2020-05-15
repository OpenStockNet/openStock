import React, { Fragment, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";

import { Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
//import { fetchAllApps } from './services/app'


class App extends Component {
  state = {
    user: this.props.user
  }

// componentDidMount() {
//   fetchAllApps() //return a promise
//   .then((apps) => {
//     console.log(apps)
//   })
// }
  

  //user parameter comes from handleSUbmit() where I call the function
  setUser = (user) => {
    this.setState({
      user: user
    })
  }

  render () {
    return (
      <div className="App">
        <Navbar />
        
        <Route
          exact
          path='/signup'
          render={(props) => <Signup  
            setUser={this.setUser} 
            history={props.history} 
            />} //{...props}
        />

        <Route
          exact
          path='/login'
          render={(props) => <Login  
            setUser={this.setUser} 
            history={props.history} 
            />} //{...props}
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
