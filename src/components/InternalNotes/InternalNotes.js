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
    console.log('timeHour', timeHour);
    
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
    return <p>{displayTime}</p>
  }

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_NOTES'});
  }

  handleChange = (event) => {
    this.setState({
      noteText: event.target.value
    })
  }

  handleSubmit = () => {
    console.log('STATE', this.state);
    
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
        <div className="noteForm">
        <label htmlFor="internalNoteInput">Notes/Updates</label>
        <input className="internalNoteInput" type="text" placeholder="add an update or note on this incident" 
        value={this.state.noteText} onChange={this.handleChange}></input> 
        <Button variant="primary" className="noteSubmit" onClick={this.handleSubmit}>Submit Note</Button>
        </div>
        <div>
          <h3>Internal Notes</h3>
            <ul>
              {this.props.store.internalNoteReducer.map((note) => {
                return(
                  note.incident_id === this.props.incidentId &&
                    <li key={note.id}>{note.text}: {this.renderTime(note.time)}</li>
                )
              })}
            </ul>
        </div>
      </>
    )

  }
}


export default connect(mapStoreToProps)(InternalNotes);