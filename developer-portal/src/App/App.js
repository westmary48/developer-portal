import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connections';

import Auth from '../ components/Auth/auth';
import Bio from '../ components/Bio/bio';
import MyNavbar from '../ components/MyNavbar/MyNavbar';
import Input from '../ components/Input/input';
import Resources from '../ components/Resources/resources';
import resourceRequest from '../helpers/data/resourceRequests';
import blogRequest from '../helpers/data/blogRequests';
import tutorialRequest from '../helpers/data/tutorialRequests';
import podcastsRequest from '../helpers/data/podcastsRequests';
import InformationTracker from '../ components/InformationTracker/informationTracker';


import './App.scss';
import authRequests from '../helpers/data/authRequests';


class App extends Component {
  state = {
    authed: false,
    tutorials: [],
    resources: [],
    blogs: [],
    podcasts: [],
    githubUsername: '',
  }

  componentDidMount() {
    connection();
    resourceRequest.getResourceRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('error with listing GET', err));

    tutorialRequest.getTutorialRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(error => console.error(error));

    blogRequest.getBlogRequest()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(error => console.error(error));

    podcastsRequest.getPodcastsRequest()
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

  deleteTurorial = (tutorialId) => {
    tutorialRequest.deleteTurorial(tutorialId)
      .then(() => {
        tutorialRequest.getTutorialRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error(err));
  }

  updateTutorial = (tutorialId, isCompleted) => {
    tutorialRequest.updateTutorial(tutorialId, isCompleted)
      .then(() => {
        tutorialRequest.getTutorialRequest()
          .then((tutorials) => {
            tutorials.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error(err));
  }

  updateResource = (resourceId, isCompleted) => {
    resourceRequest.updateResource(resourceId, isCompleted)
      .then(() => {
        Resources.getResourceRequest()
          .then((resources) => {
            resources.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ resources });
          });
      })
      .catch(err => console.error(err));
  }

  deleteResource = (resourceId) => {
    resourceRequest.deleteResource(resourceId)
      .then(() => {
        Resources.getResourceRequest()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error(err));
  }

  updateBlog = (blogId, isCompleted) => {
    blogRequest.updateBlogs(blogId, isCompleted)
      .then(() => {
        blogRequest.getBlogRequest()
          .then((blogs) => {
            blogs.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ blogs });
          });
      })
      .catch(err => console.error(err));
  }

  deleteBlog = (blogId) => {
    blogRequest.deleteBlogData(blogId)
      .then(() => {
        blogRequest.getBlogRequest()
          .then((blogs) => {
            this.setState({ blogs });
          });
      })
      .catch(err => console.error(err));
  }

  updatePodcast = (podcastsId, isCompleted) => {
    podcastsRequest.updatePodcasts(podcastsId, isCompleted)
      .then(() => {
        podcastsRequest.getPodcastsRequest()
          .then((podcasts) => {
            podcasts.sort((x, y) => x.isCompleted - y.isCompleted);
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error(err));
  }

  deletePodcast = (podcastsId) => {
    podcastsRequest.deletePodcast(podcastsId)
      .then(() => {
        podcastsRequest.getPodcastsRequest()
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
        <div className="row m-0">
        <div className="col-3 align-self-start">
          <Bio
          bio={this.state.bio}
          commits={this.state.commits}
          />
        </div>
        <div className="col-9 align-self-start pr-0">
          <Input onSubmit={this.inputSubmit}/>
          <InformationTracker
          tutorials = {this.state.tutorials}
          deleteSingleTutorial = {this.deleteTutorial}
          updateSingleTutorial = {this.updateTutorial}
          resources = {this.state.resources}
          deleteSingleResource = {this.deleteResource}
          updateSingleResource = {this.updateResource}
          blogs = {this.state.blogs}
          deleteSingleBlog = {this.deleteBlog}
          updateSingleBlog = {this.updateBlog}
          podcasts = {this.state.podcasts}
          deleteSinglePodcast = {this.deletePodcast}
          updateSinglePodcast = {this.updatePodcast}
          />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
