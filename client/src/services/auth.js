import axios from 'axios';

const signup = (username, password) => axios
  .post('/auth/signup', { username, password })
  .then((response) => {
    const user = response.data;
    return user;
  })
  .catch((error) => {
    throw error.response.data;
  });

const login = (username, password) => axios
  .post('/auth/login', { username, password })
  .then((response) => {
    const loggedInUser = response.data;
    return loggedInUser;
  })
  .catch((error) => {
    throw error.response.data;
  });

const logout = () => axios
  .delete('/auth/logout')
  .then((response) => response.data)
  .catch((error) => {
    throw error.response.data;
  });

const fetchLogInUser = () => axios
  .get('/auth/loggedin')
  .then((response) => {
    const user = response.data;
    return user;
  })
  .catch((error) => {
    throw error.response.data;
  });

export {
  signup, login, logout, fetchLogInUser,
};
