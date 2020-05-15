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

export { fetchAllApps };