import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './components/style.scss';
import './components/Medias.scss';
import './components/Button.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { fetchLogInUser } from './services/auth';

import Footer from './components/Footer';

// get logged in user and pass it as a prop
fetchLogInUser()
  .then((user) => {
    ReactDOM.render(
      <BrowserRouter>
        <App user={user} />
        <Footer />
      </BrowserRouter>,
      document.getElementById('root'),
    );
  })
  .catch((error) => {
    alert(error.message);
  });

serviceWorker.unregister();
