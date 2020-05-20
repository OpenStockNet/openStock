import axios from 'axios';

// each function is API call
//we pass param appId from AppDetail.js component to here


const getAverageRating = (appId) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/api/ratings/average/${appId}`)
    .then(response => {
      const averageRating = response.data
      return averageRating;
    })
    .catch(err => {
      throw new Error(err.response.data);
    });
}

export { getAverageRating };
