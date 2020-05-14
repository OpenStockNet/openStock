import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import axios
import axios from 'axios';

import Footer from "./components/Footer";

ReactDOM.render(
  <BrowserRouter>
    <App/>
    <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);

// get logged in user and pass it as a prop
// axios.get('/api/auth/loggedin')
//   .then(response => {
//     const user = response.data;
//     ReactDOM.render(
//       <BrowserRouter>
//         <App user={user} />
//         <Footer />
//       </BrowserRouter>,
//       document.getElementById('root')
//     );
//   });


serviceWorker.unregister();
