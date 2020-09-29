import axios from 'axios';

const fetchAllApps = () => axios
  .get(`${process.env.REACT_APP_API_URL}/api/apps`)
  .then((response) => {
    const apps = response.data;
    return apps;
  })
  .catch((error) => {
    throw error.response.data;
  });

// fetch one single app
const fetchApp = (appId) => axios
  .get(`${process.env.REACT_APP_API_URL}/api/apps/${appId}`)
  .then((response) => {
    const app = response.data;
    return app;
  })
  .catch((error) => {
    throw error.response.data;
  });

const createApp = (name, description, category, device, website, logo, creator) => {
  const app = {
    name, description, category, device, website, logo, creator,
  };
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/apps`, app)
    .then((response) => {
      const createdApp = response.data;
      return createdApp;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const deleteApp = (appId) => axios
  .delete(`${process.env.REACT_APP_API_URL}/api/apps/${appId}`)
  .then((response) => {
    const messageObj = response.data;
    return messageObj;
  })
  .catch((error) => {
    throw error.response.data;
  });

const addWishApp = (appId, userId) => axios
  .post(`${process.env.REACT_APP_API_URL}/api/apps/user/${userId}`, { appId, userId })
  .then((response) => {
    const wishAppAndUser = response.data;
    return wishAppAndUser;
  })
  .catch((error) => {
    throw error.response.data;
  });

const removeWishApp = (appId, userId) => axios
  .patch(`${process.env.REACT_APP_API_URL}/api/apps/user/${userId}`, { appId, userId })
  .then((response) => response)
  .catch((error) => {
    throw error.response.data;
  });

export {
  fetchAllApps, fetchApp, createApp, deleteApp, addWishApp, removeWishApp,
};
