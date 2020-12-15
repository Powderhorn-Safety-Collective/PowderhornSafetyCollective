import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// This component is going to be the card display for the incident
// that appears and is consumed by the Community Page Component
class IncidentModule extends Component {


  render() {
    return (
      <div>
        <h4>This is an incident</h4>
        <p>The incident happened at 6pm</p>
        <p>The dog is missing</p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IncidentModule);
