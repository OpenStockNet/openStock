import axios from 'axios';

const fetchAllApps = () => axios
  .get('/apps')
  .then((response) => {
    const apps = response.data;
    return apps;
  })
  .catch((error) => {
    throw error.response.data;
  });

const fetchApp = (appId) => axios
  .get(`/apps/${appId}`)
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
    .post('/apps', app)
    .then((response) => {
      const createdApp = response.data;
      return createdApp;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const editApp = (appId, name, description, category, device, website, logo, editor) => {
  const appToBeEdit = {
    name, description, category, device, website, logo, editor,
  };
  return axios
    .patch(`/apps/${appId}`, appToBeEdit)
    .then((response) => {
      // console.log('response from server', response.data);
      const editedApp = response.data;
      return editedApp;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const deleteApp = (appId) => axios
  .delete(`/apps/${appId}`)
  .then((response) => {
    const messageObj = response.data;
    return messageObj;
  })
  .catch((error) => {
    throw error.response.data;
  });

const addWishApp = (appId, userId) => axios
  .post(`/apps/user/${userId}`, { appId, userId })
  .then((response) => {
    const wishAppAndUser = response.data;
    return wishAppAndUser;
  })
  .catch((error) => {
    throw error.response.data;
  });

const removeWishApp = (appId, userId) => axios
  .patch(`/apps/user/${userId}`, { appId, userId })
  .then((response) => response)
  .catch((error) => {
    throw error.response.data;
  });

export {
  fetchAllApps, fetchApp, createApp, editApp, deleteApp, addWishApp, removeWishApp,
};
