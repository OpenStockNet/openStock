import axios from 'axios';

const addReview = (value, appId, userId) => axios
  .post('/reviews', { value, appId, userId })
  // response data(json(app.rviews)) sent from backend
  .then((response) => {
    const addedReview = response.data;
    return addedReview;
  })
  .catch((error) => {
    throw error.response.data;
  });

const fetchReviews = (appId) => axios
  .get(`/reviews/${appId}`)
  .then((response) => {
    const reviewsOfApp = response.data;
    return reviewsOfApp;
  })
  .catch((error) => {
    throw error.response.data;
  });

export { addReview, fetchReviews };
