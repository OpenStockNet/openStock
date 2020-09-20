import axios from 'axios';


const addReview = (value, appId, userId) => {
    return axios 
          .post(`${process.env.REACT_APP_API_URL}/api/reviews`, {value, appId, userId} )
          .then(response => {
              const addedReview = response.data
              return addedReview;
           })
          .catch(error => {
            throw error.response.data;
          });
  }

  export { addReview };