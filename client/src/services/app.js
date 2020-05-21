import axios from 'axios';

// each of function is API call
//pairing with server>routes/app.routes

const fetchAllApps = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/api/apps`)
    .then(response => {
      const apps = response.data
      return apps;
    })
    .catch(error => {
      throw error.response.data;
    });
}


//post 2nd parameter will be sent as the body in http request
//sending out { name, description, cateogry } as a body in HTTP request to '/api/apps'
const createApp = (name, description, category, device) => {
  // const app = {
  //   name: name,
  //   description: description
  // }
  const app = { name, description, category, device }
  return axios 
        .post(`${process.env.REACT_APP_API_URL}/api/apps`, app )
        .then(response => {
            const createdApp = response.data
            return createdApp;
         })
        .catch(error => {
          throw error.response.data;
        });
}

//delete app
//messageObj is the { message: 'App is deleted.' } return in res.json
const deleteApp = (appId) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/api/apps/${appId}`)
      .then(response => {
          const messageObj = response.data;
          return messageObj
      })
      .catch(error => {
        throw error.response.data;
      })
}
  

export { fetchAllApps, createApp, deleteApp };