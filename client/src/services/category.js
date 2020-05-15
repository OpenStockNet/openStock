import axios from 'axios';

//create a method to call from REACT to Express API endpoint
//we don't need it in MVC app because we always redner view on server side directly
// .get() returns a promise
const fetchAllCategories = () => {
  return axios
    .get('/api/categories')
    .then(response => {
      const categories = response.data
      return categories;
    })
    .catch(err => {
      return err.response.data;
    });
}

export { fetchAllCategories };