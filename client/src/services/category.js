import axios from 'axios';

const fetchAllCategories = () => axios
  .get('/categories')
  .then((response) => {
    const categories = response.data;
    return categories;
  })
  .catch((error) => {
    throw error.response.data;
  });

export { fetchAllCategories };
