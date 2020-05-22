import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./style.css";
import "./style.login.css";
import "./style.detailApp.css";
import "./style.newApp.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { fetchLogInUser } from "./services/auth";

import Footer from "./components/Footer";

// get logged in user and pass it as a prop
fetchLogInUser()
  .then((user) => {
    ReactDOM.render(
      <BrowserRouter>
        <App user={user} />
        <Footer />
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
  .catch((error) => {
    alert(error.message);
  });

serviceWorker.unregister();
