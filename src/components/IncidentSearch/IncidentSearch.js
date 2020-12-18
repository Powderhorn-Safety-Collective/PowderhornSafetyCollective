import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// This component will be displayed on and is consumed by the Comunity 
// Page component.  It will allow the user to search for an incident 
// by their 6 digit auto-generated incident ID
class IncidentSearch extends Component {
  state = {
    searchNumber: 0,
  };

  // this will need to be changed to search for the text entered
  search = (event) => {
    event.preventDefault();
    console.log('the search string is', this.state.searchNumber);
    
  }; // end 

  // handle change function for search input box
  handleInputChangeFor = (event) => {
    this.setState({
      searchNumber: event.target.value,
    });
    console.log('SEARCH', this.state.searchNumber);
    
  };


  render() {
    return (
      <form onSubmit={this.search}>
        <h2>Search for an Incident</h2>
        <div>
          <label htmlFor="username">
            Enter the 6 Digit Incident ID:
          </label>
          <input
            type="number"
            placeholder="######"
            name="searchNumber"
            required
            // value={this.state.searchNumber}
            onChange={(event) => this.handleInputChangeFor(event)}
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
