import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getPodcastsRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/podcasts.json`)
    .then((res) => {
      const podcasts = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          podcasts.push(res.data[key]);
        });
      }
      resolve(podcasts);
    })
    .catch(err => reject(err));
});

const deletePodcasts = podcastsId => axios.delete(`${firebaseUrl}/podcasts/${podcastsId}.json`);

const updatePodcasts = (podcastId, isCompleted) => axios.patch(`${firebaseUrl}/podcasts/${podcastId}.json`, { isCompleted });

const postPodcasts = podcast => axios.post(`${firebaseUrl}/podcasts.json`, podcast);


export default {
  deletePodcasts,
  getPodcastsRequest,
  updatePodcasts,
  postPodcasts,
};
