import axios from 'axios';

const getAverageRating = (appId) => axios
  .get(`/ratings/average/${appId}`)
  .then((response) => {
    const averageRating = response.data;
    return averageRating;
  })
  .catch((error) => {
    throw error.response.data;
  });

const rateApp = (value, app) => axios
  .post('/ratings', { value, app })
  .then((response) => {
    const rating = response.data;
    return rating;
  })
  .catch((error) => {
    throw error.response.data;
  });

export { getAverageRating, rateApp };
