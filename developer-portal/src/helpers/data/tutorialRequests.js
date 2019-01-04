import axios from 'axios';
import apiKeys from '../apiKeys';
import Tutorials from '../../ components/Tutorials/tutorials';

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
      resolve(Tutorials);
    })
    .catch(err => reject(err));
});

const deleteTurorial = tutorialId => axios.delete(`${firebaseUrl}/tutorials/${tutorialId}.json`);

const updateTutorial = (tutorialsId, isCompleted) => axios.patch(`${firebaseUrl}/tutorials/${tutorialsId}.json`, { isCompleted });


export default {
  deleteTurorial,
  getTutorialRequest,
  updateTutorial,
};
