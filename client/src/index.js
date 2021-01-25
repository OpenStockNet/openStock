import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;
// Add a global response interceptor
axios.interceptors.response.use((response) => response.data, (error) => Promise.reject(error.response ? error.response.data : error));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
