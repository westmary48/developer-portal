import React from 'react';
import './input.scss';
import authRequests from '../../helpers/data/authRequests';


const inputForm = {
  name: '',
  url: '',
  uid: '',
  type: '',
  isCompleted: false,
};

class Input extends React.Component {
  state = {
    newInputForm: inputForm,
  }

formFieldStringState = (name, e) => {
  e.preventDefault();
  const tempTracker = { ...this.state.newInputForm };
  tempTracker[name] = e.target.value;
  this.setState({ newInputForm: tempTracker });
}

nameChange = e => this.formFieldStringState('name', e);

urlchange = e => this.formFieldStringState('url', e);

changeOption = (e) => {
  const tempTracker = { ...this.state.newInputForm };
  tempTracker.type = e.target.value;
  this.setState({ newInputForm: tempTracker });
}

uncheck = () => {
  document.querySelectorAll('.form-check-input:checked')[0].checked = false;
}


inputSubmit = (e) => {
  this.uncheck();
  e.preventDefault();
  const { onSubmit } = this.props;
  const myTracker = { ...this.state.newInputForm };
  myTracker.uid = authRequests.getCurrentUid();
  onSubmit(myTracker);
  this.setState({ newInputForm: inputForm });
}

render() {
  const { newInputForm } = this.state;

  return (
      <div className="form">
        <form className="row" id= "add-form" onSubmit={this.inputSubmit}>
        <div className= "col-6">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                value= {newInputForm.name}
                placeholder="Learn Html"
                onChange={this.nameChange}
                />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="link" className="col-sm-2 col-form-label">Link</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="link"
                placeholder="www.w3school.org"
                value= {newInputForm.url}
                onChange={this.urlchange}
                />
            </div>
          </div>
          </div>
          <div className="col-4">
          <div className="form-check">
            <label className="form-check-label">
            <input
            value="tutorial"
            className="form-check-input"
            type="checkbox"
            onChange={this.changeOption}
            /> Tutorial
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value="resources"
              onChange={this.changeOption}
              /> Resources
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value="podcast"
              onChange={this.changeOption}
              /> Podcasts
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input
            className="form-check-input"
            type="checkbox"
            value="blog"
            onChange={this.changeOption}
            /> Blogs
            </label>
          </div>
          </div>
          <div className="col-2">
          <button type="submit" className="btn btn-primary col-1 add-button">+</button>
          </div>
        </form>
      </div>
  );
}
}

export default Input;
