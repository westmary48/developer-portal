import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getTutorialRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/tutorials.json`)
    .then((res) => {
      const tutorials = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tutorials.push(res.data[key]);
        });
      }
      resolve(tutorials);
    })
    .catch(err => reject(err));
});

const deleteTurorials = tutorialsId => axios.delete(`${firebaseUrl}/tutorials/${tutorialsId}.json`);

const updateTutorial = (tutorialsId, isCompleted) => axios.patch(`${firebaseUrl}/tutorials/${tutorialsId}.json`, { isCompleted });

const postTutorial = tutorial => axios.post(`${firebaseUrl}/tutorials.json`, tutorial);

export default {
  deleteTurorials,
  getTutorialRequest,
  updateTutorial,
  postTutorial,
};
