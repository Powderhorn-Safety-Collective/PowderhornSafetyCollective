import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';

class InternalNotes extends Component {

  state = {
    noteText: '',
    time_submitted: ''
  }

   // function to render time associated with incident
   renderTime = ( time) => {
    let timeHour = Number(time.slice(11,13));
    let timeMorningEvening = 'a.m.';
    if (timeHour == 12) {
      timeMorningEvening = 'p.m.';
    }
    else if (timeHour == 0) {
      timeHour = 12;
    }
    else if (timeHour > 12) {
      timeHour -= 12;
      timeMorningEvening = 'p.m.';
    }
    let timeMinute = time.slice(14, 16);
    let month = Number(time.slice(5,7));
    let day = Number(time.slice(8,10));
    let year = Number(time.slice(0,4));
    let displayTime = timeHour + ':' + timeMinute + ' ' + timeMorningEvening + ' ' + month + '/' + day + '/' + year;
    return <>{displayTime}</>
  }
// gets all the internal notes for a given incident
  componentDidMount = () => {
    this.props.dispatch({type: 'GET_NOTES'});
  }

// updates the local state with the user's input
  handleChange = (event) => {
    this.setState({
      noteText: event.target.value
    })
  }
// saves an internal note to the database and resets the localstate to clear the input
  handleSubmit = () => {
    this.props.dispatch({
      type: 'ADD_NOTE',
      payload: {noteText: this.state.noteText, time_submitted: this.state.time_submitted,
      id: this.props.incidentId}
    })
    this.setState({
      noteText: ''
    })
  }

  render (){
    return(
      <>
        <div>
        <br/>
        <h3>Internal Notes</h3>
        <>
          {this.props.store.internalNoteReducer.map((note) => {
            return(
              note.incident_id === this.props.incidentId &&
                <div className="whiteBackground" key={note.id}>{note.text} <p>Note added at {this.renderTime(note.time)}</p></div>
            );
          })}
        </>
        </div>
        <div className="noteForm">
        {/* <label htmlFor="internalNoteInput">Internal Notes</label> */}
        <textarea className="internalNoteInput" type="text" placeholder="Add an update or note on this incident." 
        value={this.state.noteText} maxLength="1000" onChange={this.handleChange}></textarea>
        <br/>
        <Button variant="primary" className="noteSubmit" onClick={this.handleSubmit}>Submit Note</Button>
        </div>
        <br/>
      </>
    );
  }
}

export default connect(mapStoreToProps)(InternalNotes);