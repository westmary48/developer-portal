import React from 'react';
import PropTypes from 'prop-types';
import './informationTracker.scss';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import information from '../../helpers/propz/information';
import Tutorials from '../Tutorials/tutorials';
import Resources from '../Resources/resources';
import Blogs from '../Blogs/blogs';
import Podcasts from '../Podcasts/podcasts';

class InformationTracker extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(information),
    deleteSingleTutorial: PropTypes.func,
    updateSingleTutorial: PropTypes.func,
    isCompleted: PropTypes.bool,
    resources: PropTypes.arrayOf(information),
    deleteSingleResource: PropTypes.func,
    updateSingleResource: PropTypes.func,
    isCompletedRes: PropTypes.bool,
    blogs: PropTypes.arrayOf(information),
    deleteSingleBlog: PropTypes.func,
    updateSingleBlog: PropTypes.func,
    isCompletedBlog: PropTypes.bool,
    podcasts: PropTypes.arrayOf(information),
    deleteSinglePodcast: PropTypes.func,
    updateSinglePodcast: PropTypes.func,
    isCompletedPodcast: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      tutorials,
      deleteSingleTutorial,
      updateSingleTutorial,
      isCompleted,
    } = this.props;
    const tutorialsItemComponent = tutorials.map(tutorial => (
      <Tutorials
      tutorial = {tutorial}
      key={tutorial.id}
      deleteSingleTutorial = {deleteSingleTutorial}
      updateSingleTutorial = {updateSingleTutorial}
      isCompleted = {isCompleted}
      />
    ));
    const {
      resources,
      deleteSingleResource,
      updateSingleResource,
      isCompletedRes,
    } = this.props;
    const resourcesItemCompent = resources.map(resource => (
      <Resources
      resource = {resource}
      key={resource.id}
      deleteSingleResource = {deleteSingleResource}
      updateSingleResource = {updateSingleResource}
      isCompletedRes = {isCompletedRes}
      />
    ));
    const {
      blogs,
      deleteSingleBlog,
      updateSingleBlog,
      isCompletedBlog,
    } = this.props;
    const blogsItemComponent = blogs.map(blog => (
      <Blogs
      blog = {blog}
      key={blog.id}
      deleteSingleBlog = {deleteSingleBlog}
      updateSingleBlog= {updateSingleBlog}
      isCompletedBlog = {isCompletedBlog}

      />
    ));
    const {
      podcasts,
      deleteSinglePodcast,
      updateSinglePodcast,
      isCompletedPodcast,
    } = this.props;
    const podcastsItemComponent = podcasts.map(podcast => (
      <Podcasts
      podcast = {podcast}
      key={podcast.id}
      deleteSinglePodcast = {deleteSinglePodcast}
      updateSinglePodcast = {updateSinglePodcast}
      isCompletedPodcast = {isCompletedPodcast}
      />
    ));
    return (
      <div className="Resource col">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Resources
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Podcasts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Blogs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ul>{tutorialsItemComponent}</ul>
          </TabPane>
          <TabPane tabId="2">
            <ul>{resourcesItemCompent}</ul>
          </TabPane>
          <TabPane tabId="3">
            <ul>{podcastsItemComponent}</ul>
          </TabPane>
          <TabPane tabId="4">
            <ul>{blogsItemComponent}</ul>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default InformationTracker;
