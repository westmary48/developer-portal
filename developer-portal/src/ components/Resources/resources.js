import React from 'react';
import PropTypes from 'prop-types';
import './resources.scss';
import informationShape from '../../helpers/propz/information';

import authRequests from '../../helpers/data/authRequests';


class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

    static propTypes = {
      resource: informationShape,
      deleteSingleResource: PropTypes.func,
      updateSingleResource: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleResource, resource } = this.props;
    (deleteSingleResource(resource.id));
  }

  updateEvent = (e) => {
    e.preventDefault();
    const { updateSingleResource, resource } = this.props;
    const isCompleted = e.target.checked;
    updateSingleResource(resource.id, isCompleted);
  }

  render() {
    const { resource } = this.props;
    const uid = authRequests.getCurrentUid();
    const makeButtons = () => {
      if (resource.uid === uid) {
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
        <li className="resource-item row">
          <span className="col-4">{resource.name}</span>
          <a href={resource.url} target="_blank" rel="noreferrer noopener" className="col-4">{resource.url}</a>
          {makeButtons()}
          <div className="checkbox-div">
            <input type="checkbox" value={this.state.value} checked={resource.isCompleted} id={resource.id} onChange={this.updateEvent}/>
            <label className="checkbox-label">Complete</label>
          </div>
        </li>
    );
  }
}
export default Resources;
