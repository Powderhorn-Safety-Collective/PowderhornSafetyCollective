import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// This component will be displayed on and is consumed by the Connunity 
// Page component.  It will allow the user to search for an incident 
// by and id string that for that incident
class IncidentSearch extends Component {
  state = {
    searchNumber: '',
  };

  // this will need to be changed to search for the text entered
  search = (event) => {
    event.preventDefault();
    console.log('the search string is', this.state.searchNumber);
    
  }; // end 

  // handle change function for search input box
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
            Incident ID:
          </label>
          <input
            type="text"
            name="searchNumber"
            required
            value={this.state.searchNumber}
            onChange={this.handleInputChangeFor()}
          />
        </div>
        <div>
          <button className="btn" 
            onClick={this.search} 
          > 
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(IncidentSearch);
