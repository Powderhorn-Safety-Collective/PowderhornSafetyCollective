import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';
import './ReportIncident.css';
import Button from 'react-bootstrap/Button';

class ReportIncident extends Component {

    state = {
        showReport: false,
        follow_incident: false,
        register: false,
        type: '',
        notes: '',
        location: '',
        time_submitted: '',
        client_id: Math.floor(Math.random() * 1010101),
        client_id_ok: false
    }

    componentDidMount = () => {
      this.clock();
      this.clientCheck();
    }

    clientCheck = () => {
      // want to check to make sure client_id doesn't already exist 
      // before assigning to new incident
      // perform get request with new client_id to see if it is associated
      // with any of the incidents and make new one if it is
      this.props.dispatch({type: 'GET_CLIENT', payload: this.state.client_id});
      setTimeout(() => { 
        console.log('this.props.store.clientIdReducer', this.props.store.clientIdReducer);
        // if the client_id is not in the database yet, success
        if (this.props.store.clientIdReducer == -1) {
          this.setState({
            client_id_ok: true
          });
        }
        // if the client_id is in the database, and a new one needs to be created
        else {
          this.props.dispatch({type: 'UNSET_CLIENT_ID'});
          this.setState({
            client_id: Math.floor(Math.random() * 1010101),
          })
          this.clientCheck();
        }
      }, 500);
    }

    clock = () => {
      setInterval(() => {
        this.setState({
          time_submitted : new Date().toLocaleString()
        })
      }, 1000)
    }

    handleChange = (event, typeParam) => {
      console.log(event.target.value, typeParam);
      this.setState( {
          [typeParam]: event.target.value
      });
    }

    submitReport = () => {
        console.log('clicked on report incident');
        this.setState( {
            showReport: true
        });
    }
   
    editSubmission = () => {
      this.setState( {
        showReport: false
      });
    }

    // this long function checks to see if the user wants to register an account or follow the incident, or both
    confirmIncident = () => {
      if(this.state.register === false && this.state.follow_incident === true) {
        this.props.dispatch({ type: 'POST_INCIDENT', payload: this.state });
        swal(
          `${this.state.client_id}`,
          `This is your incident ID, please write it down. Use this number to search for any updates on your incident.`, 
          {
            button: "Ok!",
        });
        this.props.history.push('/');
      }
      else if(this.state.register === true && this.state.follow_incident === false) {
        this.props.dispatch({ type: 'POST_INCIDENT', payload: this.state });
        swal(
          `Welcome!`,
          `Please input your information to register a new account.`, 
          {
            button: "Ok!",
        });
        this.props.history.push('/registration');
      }
      else if(this.state.register === false && this.state.follow_incident === false) {
        this.props.dispatch({ type: 'POST_INCIDENT', payload: this.state });
        swal(
          `Thank you!`,
          `We will respond to your reported incident.`, 
          {
            button: "Ok!",
        });
        this.props.history.push('/');
      }
      else if(this.state.register === true && this.state.follow_incident === true) {
        this.props.dispatch({ type: 'POST_INCIDENT', payload: this.state });
        swal(
          `${this.state.client_id}`,
          `This is your incident ID, please write it down. Use this number to search for any updates on your incident. 
          On the next page, please input your information to register a new account.`, 
          {
            button: "Ok!",
        });
        this.props.history.push('/registration');
      }
      }

  handleToggle = (event) => {
    if(event.target.name === 'followToggle') {
      this.setState( {
        follow_incident: !this.state.follow_incident
      });
    }else if(event.target.name === 'registerToggle') {
      this.setState( {
        register: !this.state.register
      });
    } 
  }

  render() {
    return (
    <>
    {JSON.stringify(this.props.store.clientIdReducer)}
    {JSON.stringify(this.state)}
    {this.state.showReport === true ? 
    <div className="registerForm">
        <h2>IS THIS CORRECT?</h2>
          <p>Time/Date: {this.state.time_submitted}</p>
          <p>Location: {this.state.location}</p>
          <p>Incident type: {this.state.type}</p>
          <p>Notes: {this.state.notes}</p>
        <br/>
          <p>Would you like to receive updates on this incident?</p>
          <ToggleSwitch toggleName="followToggle"
          handleToggle={this.handleToggle} toggleOn={this.state.follow_incident}
          />
          <p>Register with PSC and see all of your submitted incidents in one place?</p>
          <ToggleSwitch toggleName="registerToggle"
          handleToggle={this.handleToggle} toggleOn={this.state.register}
          />
        <br/>
        <br/>
          <Button className="btn btn-primary" onClick={this.editSubmission}>Edit Submission</Button>
        <br/>
        <br/>
          <Button className="btn btn-success" onClick={this.confirmIncident}>Confirm Submission</Button>
    </div>
    :
    <div className="registerForm">
      <p>Current Time: <br/>
      {this.state.time_submitted}</p>
    <br/>
      <input defaultValue={this.state.notes} type="text" placeholder="Location" onChange={(event) => this.handleChange(event, 'location')}></input>
    <br/>
      <input className="radio" type="radio" value="gunshot" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Gun shots heard</label>
    <br/>
      <input className="radio" type="radio" value="stray pet" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Stray Pet</label>
    <br/>
      <input className="radio" type="radio"  value="fire" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Fire</label>
    <br/>
      <input className="radio" type="radio"  value="vehicle" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Vehicle incident</label>
    <br/>
      <input className="radio" type="radio"  value="mental health crisis" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Mental health crisis</label>
    <br/>
      <input className="radio" type="radio" name="type"></input>
      <label>Other</label>
      <input type="text" onChange={(event) => this.handleChange(event, 'type')}></input>
    <br/>
      <textarea defaultValue={this.state.notes} placeholder="Additional Notes" onChange={(event) => this.handleChange(event, 'notes')}></textarea>
    <br/>
      <Button className="btn btn-primary" onClick={this.submitReport}>Submit Incident</Button>
    </div>
    }
    </>
    );
  }
}

export default connect(mapStoreToProps)(ReportIncident);