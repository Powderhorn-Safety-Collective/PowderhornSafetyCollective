import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import IncidentTable from '../IncidentTable/IncidentTable';
import './IncidentHistoryPage.css';

class IncidentHistoryPage extends Component {

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getIncidents();
        this.props.dispatch( {type: 'GET_NOTES'}); // need this to access reducer
      }

    // function to fetch all incident data
    getIncidents = () => {
        this.props.dispatch( {type: 'GET_INCIDENTS'});
    }

  // this component is intended to display the history of all incidents reported by all users
  render() {
    return (
      <div>
        <h2 className="centerClass">Incident Table</h2>
        <h3 className="centerClass">Click on a column's heading to sort by that data type.</h3>
          <IncidentTable incident={this.props.store.incidentReducer}/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IncidentHistoryPage);