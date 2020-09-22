import axios from 'axios';

const addReview = (value, appId, userId) => {
    return axios 
          .post(`${process.env.REACT_APP_API_URL}/api/reviews`, {value, appId, userId} )
          //receive "response" from back end, 
          //response data is sent from backend, in this case: json(app.reivews)
          .then(response => {
              const addedReview = response.data
              return addedReview;
           })
          .catch(error => {
            throw error.response.data;
          });
  }

  const fetchReviews = (appId) => {
      return axios 
        .get(`${process.env.REACT_APP_API_URL}/api/reviews/${appId}`)
        .then(response => {
            const reviewsOfApp = response.data
            console.log('what i am responding', reviewsOfApp)
            return reviewsOfApp;
        })
        .catch(error => {
            throw error.response.data;
        });
  }

  export { addReview, fetchReviews };