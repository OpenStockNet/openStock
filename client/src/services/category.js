import axios from 'axios';

//create a method to call from REACT to Express API endpoint
//we don't need it in MVC app because we always redner view on server side directly
// .get() returns a promise
const fetchAllCategories = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/api/categories`)
    .then(response => {
      const categories = response.data
      return categories;
    })
    .catch(error => {
      throw new Error(error.response.data);
    });
}

export { fetchAllCategories };