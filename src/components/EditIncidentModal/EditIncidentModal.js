import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditIncidentModal extends Component {

    state = {
        id: '',
        type: '',
        notes: '',
        location: '',
        time_submitted: '',
        status: '',
        view_publicly: '',
        responder_notes: '',
        duplicate_entry: '',
        client_id: ''
      }

      handleChange = (event, typeParam) => {
        console.log(event.target.value, typeParam);
    
        this.setState( {
            [typeParam]: event.target.value
        })
      }

      submitEdit = () => {
        console.log('editing incident');
        // this.props.dispatch( {type: 'EDIT_USER'} );
      }
    

  render() {
    return (
      <div>
            {this.props.store.editIncidentReducer ? 
            <div className="editModal">
                <label>Id</label>
                <input defaultValue={this.props.store.editIncidentReducer.id} type="text"></input>
                <br/>
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
                <label>Status</label>
                <input defaultValue={this.props.store.editIncidentReducer.status} onChange={(event) => this.handleChange(event, 'status')} type="text"></input>
                <br/>
                <label>View Publicly</label>
                <input defaultValue={this.props.store.editIncidentReducer.view_publicly} onChange={(event) => this.handleChange(event, 'view_publicly')} type="text"></input>
                <br/>
                <label>Responder Notes</label>
                <input defaultValue={this.props.store.editIncidentReducer.responder_notes} onChange={(event) => this.handleChange(event, 'responder_notes')} type="text"></input>
                <br/>
                <label>Duplicate</label>
                <input defaultValue={this.props.store.editIncidentReducer.duplicate_entry} onChange={(event) => this.handleChange(event, 'duplicate_entry')} type="text"></input>
                <br/>
                <label>Client Id</label>
                <input defaultValue={this.props.store.editIncidentReducer.client_id} onChange={(event) => this.handleChange(event, 'client_id')} type="text"></input>
                <br/>
                <button onClick={this.submitEdit}>Submit Edit</button>
            </div>
            :
            <></>
            }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditIncidentModal);