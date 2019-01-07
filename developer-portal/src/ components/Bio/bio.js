import React from 'react';
import './bio.scss';

class Bio extends React.Component {
  render() {
    const { commits } = this.props;
    return (
      <div className="bio col">
        <div className="card">
          {/* <img className="img-fluid" src={bio.avatar_url} alt="github pic"></img>
          <h2 className="card-title">{bio.login}</h2>
          <p className="card-text">{bio.bio}</p>
          <a href={bio.html_url} className="_blank">{bio.html_url}</a> */}
          <br/>
          <br/>
          <h2>{commits}</h2>
          <h6>commits</h6>
          <p>in the last 5 days</p>
        </div>
      </div>
    );
  }
}

export default Bio;
