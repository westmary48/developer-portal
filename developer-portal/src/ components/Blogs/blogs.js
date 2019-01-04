import React from 'react';
import PropTypes from 'prop-types';
import './blogs.scss';
import informationShape from '../../helpers/propz/information';
import authRequests from '../../helpers/data/authRequests';


class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

    static propTypes = {
      blogs: informationShape,
      deleteSingleBlog: PropTypes.func,
      updateSingleBlog: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleBlog, blog } = this.props;
    (deleteSingleBlog(blog.id));
  }

  updateEvent = (e) => {
    e.preventDefault();
    const { updateSingleBlog, podcast } = this.props;
    const isCompleted = e.target.checked;
    updateSingleBlog(podcast.id, isCompleted);
  }

  render() {
    const { blog } = this.props;
    const uid = authRequests.getCurrentUid();
    const makeButtons = () => {
      if (blog.uid === uid) {
        return (
            <div className="col-2 button-res">
              <span className="col">
                <button className="btn btn-danger" onClick={this.deleteEvent}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </span>
            </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
        <li className="blog-item row">
          <span className="col-4">{blog.title}</span>
          <a href={blog.url} target="_blank" rel="noreferrer noopener" className="col-4">{blog.url}</a>
          {makeButtons()}
          <div className="checkbox-div">
            <input type="checkbox" value={this.state.value} checked={blog.isCompleted} id={blog.id} onChange={this.updateEvent}/>
            <label className="checkbox-label">Complete</label>
          </div>
        </li>
    );
  }
}
export default Blogs;
