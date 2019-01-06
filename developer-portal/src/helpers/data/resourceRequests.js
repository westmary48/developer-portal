import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getResourceRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resources.json`)
    .then((res) => {
      const resources = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          resources.push(res.data[key]);
        });
      }
      resolve(resources);
    })
    .catch(err => reject(err));
});

const deleteResources = resourceId => axios.delete(`${firebaseUrl}/resources/${resourceId}.json`);

const updateResource = (resourcesId, isCompleted) => axios.patch(`${firebaseUrl}/resources/${resourcesId}.json`, { isCompleted });

const postResource = resource => axios.post(`${firebaseUrl}/resources.json`, resource);

export default {
  deleteResources,
  getResourceRequest,
  updateResource,
  postResource,
};
