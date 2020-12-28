import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';


class EditIncidentModal extends Component {

    state = {
        id: '',
        type: '',
        notes: '',
        location: '',
        time_submitted: '',
        active: '',
        view_publicly: '',
        responder_notes: '',
        duplicate_entry: '',
        client_id: ''
      }

      componentDidMount = () => {
        this.setState( {
          id: this.props.store.editIncidentReducer.id,
          type: this.props.store.editIncidentReducer.type,
          notes: this.props.store.editIncidentReducer.notes,
          location: this.props.store.editIncidentReducer.location,
          time_submitted: this.props.store.editIncidentReducer.time_submitted,
          active: this.props.store.editIncidentReducer.active,
          view_publicly: this.props.store.editIncidentReducer.view_publicly,
          responder_notes: this.props.store.editIncidentReducer.notes,
          duplicate_entry: this.props.store.editIncidentReducer.duplicate_entry,
          client_id: this.props.store.editIncidentReducer.client_id
        })
      }
    

      handleChange = (event, typeParam) => {
        console.log(event.target.value, typeParam);
    
        this.setState( {
            [typeParam]: event.target.value
        })
      }

      submitEdit = () => {
        this.props.dispatch( {type: 'SUBMIT_EDIT_INCIDENT', payload: this.state} );
        this.props.history.push('/history');
      }

      goBack = () => {
        this.props.history.push('/history');
      }
    

  render() {
    return (
      <div>
            {this.props.store.editIncidentReducer ? 
            <div className="editModal">
                <label>Type</label>
                <input defaultValue={this.props.store.editIncidentReducer.type} onChange={(event) => this.handleChange(event, 'type')} type="text"></input>
                <br/>
                <label>Notes</label>
                <input defaultValue={this.props.store.editIncidentReducer.notes} onChange={(event) => this.handleChange(event, 'notes')} type="text"></input>
                <br/>
                <label>Location</label>
                <input defaultValue={this.props.store.editIncidentReducer.location} onChange={(event) => this.handleChange(event, 'location')} type="text"></input>
                <br/>
                <label>Time Submitted</label>
                <input defaultValue={this.props.store.editIncidentReducer.time_submitted} onChange={(event) => this.handleChange(event, 'time_submitted')} type="text"></input>
                <br/>
                <label>Active</label>
                <input defaultValue={this.props.store.editIncidentReducer.active} onChange={(event) => this.handleChange(event, 'active')} type="text"></input>
                <br/>
                <label>View Publicly</label>
                <input defaultValue={this.props.store.editIncidentReducer.view_publicly} onChange={(event) => this.handleChange(event, 'view_publicly')} type="text"></input>
                <br/>
                <label>Duplicate</label>
                <input defaultValue={this.props.store.editIncidentReducer.duplicate_entry} onChange={(event) => this.handleChange(event, 'duplicate_entry')} type="text"></input>
                <br/>
                  <Button onClick={this.submitEdit} variant="primary">Submit Edit</Button>
                <br/>
                  <Button onClick={this.goBack} variant="warning">Back to Data Table</Button>
            </div>
            :
            <></>
            }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditIncidentModal);