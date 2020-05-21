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
    .catch(error => {
      throw error.response.data;
    });
}

//add post function to pass rating value to rating.routes.js
//{value, app} shall align with what we extract from req.body in rating.routes
//, beacuse we pass the keys that we save to DB
const rateApp = (value, app) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/ratings`, {value, app})
      .then(response => {
        const rating = response.data
        return rating;
      })
      .catch(error => {
        throw error.response.data;
      });
  }
  
export { getAverageRating, rateApp };
