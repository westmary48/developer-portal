import React from 'react';
import PropTypes from 'prop-types';
import './podcasts.scss';
import informationShape from '../../helpers/propz/information';
import authRequests from '../../helpers/data/authRequests';


class Podcasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

    static propTypes = {
      blog: informationShape,
      deleteSinglePodcast: PropTypes.func,
      updateSinglePodcast: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSinglePodcast, podcast } = this.props;
    (deleteSinglePodcast(podcast.id));
  }

  updateEvent = (e) => {
    e.preventDefault();
    const { updateSinglePodcast, podcast } = this.props;
    const isCompleted = e.target.checked;
    updateSinglePodcast(podcast.id, isCompleted);
  }

  render() {
    const { podcast } = this.props;
    const uid = authRequests.getCurrentUid();
    const makeButtons = () => {
      if (podcast.uid === uid) {
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
        <li className="podcasts-item row">
          <span className="col-4">{podcast.name}</span>
          <a href={podcast.url} target="_blank" rel="noreferrer noopener" className="col-4">{podcast.url}</a>
          {makeButtons()}
          <div className="checkbox-div">
            <input type="checkbox" value={this.state.value} checked={podcast.isCompleted} id={podcast.id} onChange={this.updateEvent}/>
            <label className="checkbox-label">Complete</label>
          </div>
        </li>
    );
  }
}
export default Podcasts;
