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
  search = () => {
    console.log('SEARCHING', this.state);
    this.props.dispatch({
      type: 'FETCH_SEARCHED_INCIDENT',
      payload: this.state
    }) 
    document.getElementById('searchNum').reset();
    this.setState({
      searchNumber: 0
    })
  }; // end 

  // handle change function for search input box
  handleInputChangeFor = (event) => {
    this.setState({
      searchNumber: event.target.value,
    });
  };

  noResults = () => {
    console.log('There are no results');
    // TODO ADD NO RESULTS ALERT
  }


  render() {
    return (
      <form id="searchNum">
        <h2>Search for an Incident</h2>
        {JSON.stringify(this.props.store.searchIncidentReducer)}
        <div>
          <label htmlFor="searchNum">
            Enter the 6 Digit Incident ID:
          </label>
          <input
            type="text"
            placeholder="######"
            name="searchNum"
            // required
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
