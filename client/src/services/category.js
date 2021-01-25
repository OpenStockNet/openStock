import axios from 'axios';

const fetchAllCategories = () => axios
  .get('/categories');

export { fetchAllCategories };
