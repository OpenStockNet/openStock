import axios from 'axios';

//axios returns a response object, which has a property "data"
//this 'data' contains whatever is in our request body
const signup = (username, password) => {
  return axios
    .post('/api/auth/signup', { username, password })
    .then(response => {
      const user = response.data
      return user;
    })
    .catch(err => {
      return err.response.data;
    });
}

const login = (username, password) => {
  return axios
    .post('/api/auth/login', { username, password })
    .then(response => {
      const loggedInUser = response.data
      return loggedInUser;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout };