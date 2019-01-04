import React from 'react';
import PropTypes from 'prop-types';
import './tutorials.scss';
import informationShape from '../../helpers/propz/information';
import authRequests from '../../helpers/data/authRequests';


class Tutorials extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

    static propTypes = {
      resource: informationShape,
      deleteSingleTutorial: PropTypes.func,
      updateSingleTutorial: PropTypes.func,
    }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleTutorial, tutorial } = this.props;
    (deleteSingleTutorial(tutorial.id));
  }

  updateEvent = (e) => {
    e.preventDefault();
    const { updateSingleTutorial, tutorial } = this.props;
    const isCompleted = e.target.checked;
    updateSingleTutorial(tutorial.id, isCompleted);
  }

  render() {
    const { tutorial } = this.props;
    const uid = authRequests.getCurrentUid();
    const makeButtons = () => {
      if (tutorial.uid === uid) {
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
          <span className="col-4">{tutorial.title}</span>
          <a href={tutorial.url} target="_blank" rel="noreferrer noopener" className="col-4">{tutorial.url}</a>
          {makeButtons()}
          <div className="checkbox-div">
            <input type="checkbox" value={this.state.value} checked={tutorial.isCompleted} id={tutorial.id} onChange={this.updateEvent}/>
            <label className="checkbox-label">Complete</label>
          </div>
        </li>
    );
  }
}
export default Tutorials;
