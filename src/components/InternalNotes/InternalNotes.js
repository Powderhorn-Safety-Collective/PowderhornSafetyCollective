import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';

class InternalNotes extends Component {
  state = {
    noteText: '',
    time_submitted: ''
  }
  componentDidMount = () => {
    this.props.dispatch({type: 'GET_NOTES'});
  }

  clock = () => {
    setInterval(() => {
      this.setState({
        time_submitted : new Date().toLocaleString()
      })
    }, 1000)
  }

  handleChange = (event) => {
    this.setState({
      noteText: event.target.value
    })
  }

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
                    <li key={note.id}>{note.text}</li>
                )
              })}
            </ul>
        </div>
      </>
    )

  }
}


export default connect(mapStoreToProps)(InternalNotes);