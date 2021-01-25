import axios from 'axios';

const getAverageRating = (appId) => axios
  .get(`/ratings/average/${appId}`);

const rateApp = (value, app) => axios
  .post('/ratings', { value, app });

export { getAverageRating, rateApp };
