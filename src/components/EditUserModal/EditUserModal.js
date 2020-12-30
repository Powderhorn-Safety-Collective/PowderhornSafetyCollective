import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormCheckInput from 'react-bootstrap/FormCheckInput';

class EditUserModal extends Component {

  state = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    phone: '',
    adult: '',
    on_patrol: '',
    on_call: '',
    role: ''
  }
  
  componentDidMount = () => {
    this.setState( {
      id: this.props.store.editUserReducer.id,
      username: this.props.store.editUserReducer.username,
      first_name: this.props.store.editUserReducer.first_name,
      last_name: this.props.store.editUserReducer.last_name,
      address: this.props.store.editUserReducer.address,
      email: this.props.store.editUserReducer.email,
      phone: this.props.store.editUserReducer.phone,
      adult: this.props.store.editUserReducer.adult,
      on_patrol: this.props.store.editUserReducer.on_patrol,
      on_call: this.props.store.editUserReducer.on_call,
      role: this.props.store.editUserReducer.role
    })
  }

  handleChange = (event, typeParam) => {
    console.log(event.target.value, typeParam);
  
    this.setState( {
        [typeParam]: event.target.value
    })
  }

  submitEdit = () => {
    console.log('editing user');
    this.props.dispatch( {type: 'SUBMIT_EDIT_USER', payload: this.state} );
    this.props.history.push('/edit');
  }

  goBack = () => {
    this.props.history.push('/edit');
  }

  handlOptionChange = (event) => {
    console.log("name", event.target.name);
    console.log("value", event.target.value);
    
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  render() {
    return (
      <div>
        <p>editUserReducer:</p>
        {JSON.stringify(this.props.store.editUserReducer)}
        <p>state:</p>
        {JSON.stringify(this.state)}
          {this.props.store.editUserReducer ? 
          <div className="editModal">
          <p>Id: {this.state.id}</p>
          <p>Username: {this.state.username}</p>
          <label>First Name*:</label>
          <input defaultValue={this.props.store.editUserReducer.first_name} onChange={(event) => this.handleChange(event, 'first_name')} type="text"></input>
          <br/>
          <label>Last Name*:</label>
          <input defaultValue={this.props.store.editUserReducer.last_name} onChange={(event) => this.handleChange(event, 'last_name')} type="text"></input>
          <br/>
          <label>Address:</label>
          <input defaultValue={this.props.store.editUserReducer.address} onChange={(event) => this.handleChange(event, 'address')} type="text"></input>
          <br/>
          <label>Email*:</label>
          <input defaultValue={this.props.store.editUserReducer.email} onChange={(event) => this.handleChange(event, 'email')} type="text"></input>
          <br/>
          <label>Phone*:</label>
          <input defaultValue={this.props.store.editUserReducer.phone} onChange={(event) => this.handleChange(event, 'email')} type="text"></input>
          <br/>
          <label>Is the user an adult?*:</label>
          <div className="form-check">
            <label>
              <input 
                type="radio"
                name="adult"
                value={"true"}
                checked={this.state.adult == true || this.state.adult == "true"}
                onChange={this.handlOptionChange}
                className="form-check-input"
                />
              Yes
            </label>
          </div>
          <div className="form-check">
            <label>
              <input 
                type="radio"
                name="adult"
                value={"false"}
                checked={this.state.adult == false || this.state.adult == "false"}
                onChange={this.handlOptionChange}
                className="form-check-input"
                />
              No
            </label>
          </div>
          <label>On Patrol*:</label>
          <input defaultValue={this.props.store.editUserReducer.on_patrol} onChange={(event) => this.handleChange(event, 'on_patrol')} type="text"></input>
          <br/>
          <label>On Call*:</label>
          <input defaultValue={this.props.store.editUserReducer.on_call} onChange={(event) => this.handleChange(event, 'on_call')} type="text"></input>
          <br/>
          <label>Role*:</label>
          {/* use radio buttons here for user, volunteer, and admin */}
          <div className="form-check">
            <label>
              <input 
                type="radio"
                name="role"
                value={1}
                checked={this.state.role == 1}
                onChange={this.handlOptionChange}
                className="form-check-input"
                />
              PSC User
            </label>
          </div>
          <div className="form-check">
            <label>
              <input 
                type="radio"
                name="role"
                value={2}
                checked={this.state.role == 2}
                onChange={this.handlOptionChange}
                className="form-check-input"
                />
              PSC Volunteer
            </label>
          </div>
          <div className="form-check">
            <label>
              <input 
                type="radio"
                name="role"
                value={3}
                checked={this.state.role == 3}
                onChange={this.handlOptionChange}
                className="form-check-input"
              />
              PSC Administrator
            </label>
          </div>
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

export default connect(mapStoreToProps)(EditUserModal);