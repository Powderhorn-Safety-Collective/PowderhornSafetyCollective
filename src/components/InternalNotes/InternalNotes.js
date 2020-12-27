import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class InternalNotes extends Component {
  state = {
    noteText: ''
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
    this.props.dispatch({
      type: 'ADD_NOTE',
      payload: {noteText: this.state.noteText,
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
        <button className="noteSubmit" onClick={this.handleSubmit}>Submit Note</button>
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