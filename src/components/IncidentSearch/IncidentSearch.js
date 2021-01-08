import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';

// This component will be displayed on and is consumed by the Comunity 
// Page component.  It will allow the user to search for an incident 
// by their 6 digit auto-generated incident ID
class IncidentSearch extends Component {
  state = {
    searchNumber: 0,
  };

  // sends searched ID to incident SAGA
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


  render() {
    return (
      <form id="searchNum" className="box">
        <h2>Search for an Incident</h2>
        <div className="box">
          <label htmlFor="searchNum">
            Enter the 6 Digit Incident ID:
          </label>
          <input
            type="text"
            placeholder="######"
            name="searchNum"
            onChange={(event) => this.handleInputChangeFor(event)}
          />
        </div>
        <div>
          <Button className="btn" 
            onClick={this.search} 
          > 
            Search
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(IncidentSearch);
