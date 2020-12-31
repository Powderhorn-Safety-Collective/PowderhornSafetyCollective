import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';
import './ReportIncident.css';

class ReportIncident extends Component {

    state = {
        showReport: false,
        follow_incident: false,
        register: false,
        type: '',
        notes: '',
        location: '',
        time_submitted: '',
        client_id: Math.floor(Math.random() * 1010101)
    }

    componentDidMount = () => {
      this.clock();
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
    {JSON.stringify(this.state)}
    {this.state.showReport === true ? 
    <div className="registerForm">
        <h2>IS THIS CORRECT?</h2>
          <p>Time/Date: {this.state.time_submitted}</p>
          <p>Location: {this.state.location}</p>
          <p>Incident type: {this.state.type}</p>
          <p>Notes: {this.state.notes}</p>
        <br/>
          <p>Updates on the incident? Y/N</p>
          <ToggleSwitch toggleName="followToggle"
          handleToggle={this.handleToggle} toggleOn={this.state.follow_incident}
          />
          <p>Sign up for an account Y/N (ANON)</p>
          <ToggleSwitch toggleName="registerToggle"
          handleToggle={this.handleToggle} toggleOn={this.state.register}
          />
        <br/>
        <br/>
          <button className="btn" onClick={this.editSubmission}>Edit Submission</button>
        <br/>
        <br/>
          <button className="btn" onClick={this.confirmIncident}>Confirm Submission</button>
    </div>
    :
    <div className="registerForm">
      <p>Current Time: <br/>
      {this.state.time_submitted}</p>
    <br/>
      <input defaultValue={this.state.notes} type="text" placeholder="Location" onChange={(event) => this.handleChange(event, 'location')}></input>
    <br/>
      <input className="radio" type="radio" value="Gunfire" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Gunfire</label>
    <br/>
      <input className="radio" type="radio" value="Armed Assault/Robbery" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Armed Assault/Robbery</label>
    <br/>
      <input className="radio" type="radio"  value="Assualt/Fighting" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Assualt/Fighting</label>
    <br/>
      <input className="radio" type="radio"  value="Fire (Please call 911 first)" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Fire (Please call 911 first)</label>
    <br/>
      <input className="radio" type="radio"  value="Medical Emergency" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Medical Emergency</label>
    <br/>
    <input className="radio" type="radio"  value="Mental Health Emergency" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Mental Health Emergency</label>
    <br/>
    <input className="radio" type="radio"  value="Drug Overdose" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Drug Overdose</label>
    <br/>
    <input className="radio" type="radio"  value="Break In/Theft" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Break In/Theft</label>
    <br/>
    <input className="radio" type="radio"  value="Vandalism" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Vandalism</label>
    <br/>
    <input className="radio" type="radio"  value="Car Accident" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Car Accident</label>
    <br/>
    <input className="radio" type="radio"  value="Vehicle Problem" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Vehicle Problem</label>
    <br/>
    <input className="radio" type="radio"  value="Police Activity" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Police Activity</label>
    <br/>
    <input className="radio" type="radio"  value="Suspicious Behavior" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Suspicious Behavior</label>
    <br/>
    <input className="radio" type="radio"  value="Unsafe Behavior" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Unsafe Behavior</label>
    <br/>
    <input className="radio" type="radio"  value="Safety Escort" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>Safety Escort</label>
    <br/>
    <input className="radio" type="radio"  value="In need of neighborly help" onChange={(event) => this.handleChange(event, 'type')} name="type"></input>
      <label>In need of neighborly help</label>
    <br/>
      <input className="radio" type="radio" name="type"></input>
      <label>Other</label>
      <input type="text" onChange={(event) => this.handleChange(event, 'type')}></input>
    <br/>
      <textarea defaultValue={this.state.notes} placeholder="Additional Notes" onChange={(event) => this.handleChange(event, 'notes')}></textarea>
    <br/>
      <button className="btn" onClick={this.submitReport}>Submit Incident</button>
    </div>
    }
    </>
    );
  }
}

export default connect(mapStoreToProps)(ReportIncident);