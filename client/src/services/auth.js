import axios from 'axios';

const signup = (username, password) => axios
  .post('/auth/signup', { username, password });

const login = (username, password) => axios
  .post('/auth/login', { username, password });

const logout = () => axios
  .delete('/auth/logout');

const fetchLogInUser = () => axios
  .get('/auth/loggedin');

export {
  signup, login, logout, fetchLogInUser,
};
