import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';

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

    submitReport = () => {
        console.log('clicked on report incident');
        this.setState( {
            showReport: true
        });
    }

    handleChange = (event, typeParam) => {
      console.log(event.target.value, typeParam);
      this.setState( {
          [typeParam]: event.target.value
      });
    }

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
          Please input your information to register a new account.`, 
          {
            button: "Ok!",
        });
        this.props.history.push('/registration');
      }
      }
      

      editSubmission = () => {
        this.setState( {
          showReport: false
        });
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
        <div className="editModal">
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
    <div className="editModal">
    <p>Current Time: <br/>
    {this.state.time_submitted}</p>
    <br/>
    <input type="text" placeholder="Location" onChange={(event) => this.handleChange(event, 'location')}></input>
    <br/>
    <input type="checkbox" value="gunshot" onChange={(event) => this.handleChange(event, 'type')}></input>
    <label>Gun shots heard</label>
    <br/>
    <input type="checkbox" value="stray pet" onChange={(event) => this.handleChange(event, 'type')}></input>
    <label>Stray Pet</label>
    <br/>
    <input type="checkbox" value="fire" onChange={(event) => this.handleChange(event, 'type')}></input>
    <label>Fire</label>
    <br/>
    <input type="checkbox" value="vehicle" onChange={(event) => this.handleChange(event, 'type')}></input>
    <label>Vehicle incident</label>
    <br/>
    <input type="checkbox" value="mental health crisis" onChange={(event) => this.handleChange(event, 'type')}></input>
    <label>Mental health crisis</label>
    <br/>
    <input type="checkbox"></input>
    <label>Other</label>
    <input type="text" onChange={(event) => this.handleChange(event, 'type')}></input>
    <br/>
    <textarea placeholder="Additional Notes" onChange={(event) => this.handleChange(event, 'notes')}></textarea>
    <br/>
    <button className="btn" onClick={this.submitReport}>Submit Incident</button>
  </div>
    }

    </>
    );
  }
}

export default connect(mapStoreToProps)(ReportIncident);