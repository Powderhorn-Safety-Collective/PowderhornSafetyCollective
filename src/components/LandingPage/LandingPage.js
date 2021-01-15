import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button'; 
import './LandingPage.css';
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {

  state = {
    heading: 'Welcome to the Powderhorn Safety Collective',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>
        <div className="grid">
          <div className="grid-col grid-col_12">
            <p>
            The Powderhorn Safety Collective is a community organization in the Powderhorn Park area of Minneapolis, MN.
            </p>
            <p>
            The Powderhorn Safety Collective (PSC) envisions a new form of community response that calls upon the resources of the neighborhood rather than the police. We are neighbors providing support to the community with compassion and care in mind. As a collective we commit to the practices of nonviolence and de-escalation with the end goal of strengthening the social fabric of the neighborhood.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
