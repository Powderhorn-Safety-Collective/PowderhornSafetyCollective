import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ReportIncident extends Component {

    state = {
        showReport: false
    }

    submitReport = () => {
        console.log('clicked on report incident');
        this.setState( {
            showReport: true
        })
    }

    confirmIncident = () => {
        this.setState( {
            showReport: false
        })
    }

  render() {
    return (
    <>
        {this.state.showReport === true ? 
        <div className="editModal">
            <h2>IS THIS CORRECT?</h2>
            <p>Time/Date:</p>
            <p>Location:</p>
            <p>Incident type:</p>
            <p>Notes:</p>
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
        <input type="datetime-local" placeholder="TIME/DATE"></input>
        <br/>
        <input type="text" placeholder="Location"></input>
        <br/>
        <input type="checkbox"></input>
        <label>Gun shots heard</label>
        <br/>
        <input type="checkbox"></input>
        <label>Stray Pet</label>
        <br/>
        <input type="checkbox"></input>
        <label>Fire</label>
        <br/>
        <input type="checkbox"></input>
        <label>Vehicle incident</label>
        <br/>
        <input type="checkbox"></input>
        <label>Mental health crisis</label>
        <br/>
        <input type="checkbox"></input>
        <label>Other</label>
        <input type="text"></input>
        <br/>
        <textarea placeholder="Additional Notes"></textarea>
        <br/>
        <button className="btn" onClick={this.submitReport}>Submit Incident</button>
      </div>
    </>
    );
  }
}

export default connect(mapStoreToProps)(ReportIncident);