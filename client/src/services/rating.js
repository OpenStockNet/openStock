import axios from 'axios';

// each function is API call
const getAverageRating = (appId) => axios
  .get(`${process.env.REACT_APP_API_URL}/api/ratings/average/${appId}`)
  .then((response) => {
    const averageRating = response.data;
    return averageRating;
  })
  .catch((error) => {
    throw error.response.data;
  });

const rateApp = (value, app) => axios
  .post(`${process.env.REACT_APP_API_URL}/api/ratings`, { value, app })
  .then((response) => {
    const rating = response.data;
    return rating;
  })
  .catch((error) => {
    throw error.response.data;
  });

export { getAverageRating, rateApp };
