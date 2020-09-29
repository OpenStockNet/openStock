import axios from 'axios';

const signup = (username, password) => axios
  .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { username, password })
  .then((response) => {
    const user = response.data;
    return user;
  })
  .catch((error) => {
    throw error.response.data;
  });

const login = (username, password) => axios
  .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password })
  .then((response) => {
    const loggedInUser = response.data;
    return loggedInUser;
  })
  .catch((error) => {
    throw error.response.data;
  });

const logout = () => axios
  .delete(`${process.env.REACT_APP_API_URL}/api/auth/logout`)
  .then((response) => response.data)
  .catch((error) => {
    throw error.response.data;
  });

const fetchLogInUser = () => axios
  .get(`${process.env.REACT_APP_API_URL}/api/auth/loggedin`)
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
