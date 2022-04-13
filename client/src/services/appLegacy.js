import axios from 'axios';

const fetchAllApps = () => axios
  .get('/apps');

const fetchApp = (appId) => axios
  .get(`/apps/${appId}`);

const createApp = (name, description, category, device, website, logo, creator) => {
  const app = {
    name, description, category, device, website, logo, creator,
  };
  return axios
    .post('/apps', app);
};

const editApp = (appId, name, description, category, device, website, logo, editor) => {
  const appToBeEdit = {
    name, description, category, device, website, logo, editor,
  };
  return axios
    .patch(`/apps/${appId}`, appToBeEdit);
};

const deleteApp = (appId) => axios
  .delete(`/apps/${appId}`);

const addWishApp = (appId, userId) => axios
  .post(`/apps/user/${userId}`, { appId, userId });

const removeWishApp = (appId, userId) => axios
  .patch(`/apps/user/${userId}`, { appId, userId });

export {
  fetchAllApps, fetchApp, createApp, editApp, deleteApp, addWishApp, removeWishApp,
};
