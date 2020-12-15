
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import './CommunityPage.css';
import IncidentSearch from '../IncidentSearch/IncidentSearch';
import IncidentModule from '../IncidentModule/IncidentModule';


// Community Page component
// visible to everyone
// contains organization info and links, a list of incidents, and
// a section for login and search for an incident
class CommunityPage extends Component {
  state = {
  };

    // GET request is called on page load
    // to retrieve all incident data
  componentDidMount = () => {
    this.getPublicIncidents();
  }

  // function to fetch all incident data
  getPublicIncidents = () => {
    this.props.dispatch( {type: 'GET_PUBLIC_INCIDENTS'});
  }

  render() {
    return (
      <div className="row">
        {/* This div should have the left stuff */}
        <div className="column">
          <div className="box">
            {/* we can put whatever site they want here later */}
            <a target="_blank" href="https://www.facebook.com/Powderhorn-Safety-Collective-110798767447531/" rel="noopener noreferrer">
              <h2>
                Community Resources
              </h2>
            </a>
          </div>
          <div className="box">
            {/* we will change link later */}
            <a target="_blank" href="https://www.facebook.com/Powderhorn-Safety-Collective-110798767447531/" rel="noopener noreferrer">
              <h2>
                Community Events
              </h2>
            </a>
          </div>
          <div className="box">
            <h2>
              PSC Contact Info
            </h2>
          </div>
          <div className="box">
            <h2>
              Subscribe to our mailing list
            </h2>
          </div>
        </div>
        {/* middle stuff / incident cards */}
        <div className="column">
          <div className="box">
            <h2>
              About Us
            </h2>
          </div>
          <div className="box scrollable" >
            <h2>
              Incidents
            </h2>
              {/* incident card components will go here */}
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
              <IncidentModule/>
          </div>
        </div>
        {/* right column stuff / login and search */}
        <div className="column">
          <div className="box">
            <LoginForm/>
          </div>
          <div className="box">
            <IncidentSearch/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CommunityPage);
