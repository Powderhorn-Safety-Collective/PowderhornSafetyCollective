import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ReportIncident extends Component {

    state = {
        showReport: false,
        type: '',
        notes: '',
        location: '',
        time_submitted: ''
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
      this.setState( {
          showReport: false
      });
      this.props.dispatch({ type: 'POST_INCIDENT', payload: this.state });
    }

  render() {
    return (
    <>
        {this.state.showReport === true ? 
        <div className="editModal">
            <h2>IS THIS CORRECT?</h2>
            <p>Time/Date: {this.state.time_submitted}</p>
            <p>Location: {this.state.location}</p>
            <p>Incident type: {this.state.type}</p>
            <p>Notes: {this.state.notes}</p>
            <br/>
            <p>Updates on the incident? Y/N</p>
            <p>Sign up for an account Y/N (ANON)</p>
            <button>Edit Submission</button>
            <br/>
            <br/>
            <button className="btn" onClick={this.confirmIncident}>Submit Incident</button>
        </div>
    :
    <></>
    }
      <div>
        {JSON.stringify(this.state)}
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
    </>
    );
  }
}

export default connect(mapStoreToProps)(ReportIncident);