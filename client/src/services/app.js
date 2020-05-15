import axios from 'axios';

const fetchAllApps = () => {
  return axios
    .get('/api/apps')
    .then(response => {
      const apps = response.data
      return apps;
    })
    .catch(err => {
      return err.response.data;
    });
}

//post 2nd parameter will be sent as the body in http request
const createApp = (app) => {
    return axios
        .post('/api/apps', app)
        .then(response => {
            const createdApp = response.data
            return createdApp;
         })
        .catch(err => {
            return err.response.data;
        });
}

//delete app
//messageObj is the { message: 'App is deleted.' } return in res.json
const deleteApp = (appId) => {
    return axios
      .delete(`/api/apps/${appId}`)
      .then(response => {
          const messageObj = response.data;
          return messageObj
      })
      .catch(err => {
          return err.response.data
      })
}
  

export { fetchAllApps, createApp, deleteApp };