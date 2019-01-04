import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connections';

import Auth from '../ components/Auth/auth';
import Bio from '../ components/Bio/bio';
import MyNavbar from '../ components/MyNavbar/MyNavbar';
import Input from '../ components/Input/input';
import Tutorials from '../ components/Tutorials/tutorials';
import Resources from '../ components/Resources/resources';

import './App.scss';
import authRequests from '../helpers/data/authRequests';
import resourceData from '../helpers/data/resourceRequests';
import Blogs from '../ components/Blogs/blogs';
import tutorialData from '../helpers/data/tutorialRequests';
import blogData from '../helpers/data/blogRequests';
import podcastData from '../helpers/data/podcastsRequests';
import Podcasts from '../ components/Podcasts/podcasts';


class App extends Component {
  state = {
    authed: false,
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
  }

  componentDidMount() {
    connection();
    resourceData.getResourceRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('error with listing GET', err));

    tutorialData.getTutorialRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(error => console.error(error));

    blogData.getBlogRequest()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(error => console.error(error));

    podcastData.getPodcastRequest()
      .then((podcasts) => {
        this.setState({ podcasts });
      })
      .catch(error => console.error(error));
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  deleteTutorial = (tutorialId) => {
    tutorialData.deleteTutorial(tutorialId)
      .then(() => {
        tutorialData.getTurtorialData()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error(err));
  }

  updateTutorial = (tutorialId, isCompleted) => {
    tutorialData.updateTutorial(tutorialId, isCompleted)
      .then(() => {
        tutorialData.getTurtorialData()
          .then((tutorials) => {
            tutorials.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error(err));
  }

  updateResource = (resourceId, isCompleted) => {
    resourceData.updateResource(resourceId, isCompleted)
      .then(() => {
        resourceData.getResourceData()
          .then((resources) => {
            resources.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ resources });
          });
      })
      .catch(err => console.error(err));
  }

  deleteResource = (resourceId) => {
    resourceData.deleteResource(resourceId)
      .then(() => {
        resourceData.getResourceData()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error(err));
  }

  updateBlog = (blogId, isCompleted) => {
    blogData.updateBlogs(blogId, isCompleted)
      .then(() => {
        blogData.getBlogData()
          .then((blogs) => {
            blogs.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ blogs });
          });
      })
      .catch(err => console.error(err));
  }

  deleteBlog = (blogId) => {
    blogData.deleteBlogData(blogId)
      .then(() => {
        blogData.getBlogData()
          .then((blogs) => {
            this.setState({ blogs });
          });
      })
      .catch(err => console.error(err));
  }

  updatePodcast = (podcastId, isCompleted) => {
    podcastData.updatePodcasts(podcastId, isCompleted)
      .then(() => {
        podcastData.getPodcastData()
          .then((podcasts) => {
            podcasts.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error(err));
  }

  deletePodcast = (podcastId) => {
    podcastData.deletePodcastData(podcastId)
      .then(() => {
        podcastData.getPodcastData()
          .then((podcasts) => {
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error(err));
  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
        <Bio />
        <Blogs blogs={this.state.blogs}/>
        <Tutorials tutorials={this.state.tutorials}/>
        <Resources resources={this.state.resources}/>
        <Podcasts podcasts={this.state.podcasts}/>
        <Input />
      </div>
    );
  }
}

export default App;
