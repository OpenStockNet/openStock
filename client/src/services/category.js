import axios from 'axios';

const fetchAllCategories = () => axios
  .get(`${process.env.REACT_APP_API_URL}/api/categories`)
  .then((response) => {
    const categories = response.data;
    return categories;
  })
  .catch((error) => {
    throw error.response.data;
  });

export { fetchAllCategories };
