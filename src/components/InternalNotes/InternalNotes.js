import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class InternalNotes extends Component {
  state = {
    noteText: ''
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
  }

  render (){
    return(
      <>
      <label htmlFor="internalNoteInput">Notes/Updates</label>
      <input className="internalNoteInput" type="text" placeholder="add an update or note on this incident" onChange={this.handleChange}></input> 
      <button className="noteSubmit" onClick={this.handleSubmit}>Submit Note</button>
      </>
    )

  }
}


export default connect(mapStoreToProps)(InternalNotes);