import axios from 'axios';

const addReview = (value, appId, userId) => axios
  .post('/reviews', { value, appId, userId });

const fetchReviews = (appId) => axios
  .get(`/reviews/${appId}`);

export { addReview, fetchReviews };
