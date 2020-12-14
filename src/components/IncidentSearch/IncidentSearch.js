import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class IncidentSearch extends Component {
  state = {
    searchNumber: '',
  };


  // this will need to be changed to search for the text entered
  search = (event) => {
    event.preventDefault();


  }; // end 

  handleInputChangeFor = () => (event) => {
    this.setState({
      searchNumber: event.target.value,
    });
  };


  render() {
    return (
      <form onSubmit={this.search}>
        <h2>Search</h2>
        <h4>Search for an incident by Incident ID</h4>
        <div>
          <label htmlFor="username">
            Incident ID
            <input
              type="text"
              name="username"
              required
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
        <h4>New to PSC?</h4>
        {/* button to get registration modal */}
        <button
            type="button"
            className="btn"
            onClick={() => {this.register()}}
          >
            Register Here
        </button>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(IncidentSearch);
