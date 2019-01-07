import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getBlogRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/blogs.json`)
    .then((res) => {
      const blogs = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          blogs.push(res.data[key]);
        });
      }
      resolve(blogs);
    })
    .catch(err => reject(err));
});

const deleteBlogs = blogId => axios.delete(`${firebaseUrl}/blogs/${blogId}.json`);

const updateBlogs = (blogId, isCompleted) => axios.patch(`${firebaseUrl}/blogs/${blogId}.json`, { isCompleted });

const postBlog = blog => axios.post(`${firebaseUrl}/blogs.json`, blog);

export default {
  deleteBlogs,
  getBlogRequest,
  updateBlogs,
  postBlog,
};
