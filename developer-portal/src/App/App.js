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
import getResourceRequest from '../helpers/data/resourceRequests';
import Blogs from '../ components/Blogs/blogs';

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
    getResourceRequest.getRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('error with listing GET', err));
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

  // deleteOne = (listingId) => {
  //   listingRequests.deleteListing(listingId)
  //     .then(() => {
  //       listingRequests.getRequest()
  //         .then((listings) => {
  //           this.setState({ listings });
  //         });
  //     })
  //     .catch(err => console.error('error with delete single', err));
  // }


  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
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
        <Blogs />
        <Tutorials />
        <Resources resources={this.state.resources}/>
        <Input />
      </div>
    );
  }
}

export default App;
