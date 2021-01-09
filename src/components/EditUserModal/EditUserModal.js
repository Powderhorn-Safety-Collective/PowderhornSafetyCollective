import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-number-input/input';

import swal from 'sweetalert';

class EditUserModal extends Component {

  state = {
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
    role: this.props.store.editUserReducer.role,
    skills: [],
  }
  
  componentDidMount = () => {
    // fetches all the skills from the skills list in the DB
    this.props.dispatch({type:'FETCH_ALL_SKILLS'});
  }

  renderSkills = (skillItem) => {
    const thisUserSkillArray = [];
    this.props.store.userSkillsReducer.map((skill) => {
      if(skill.user_id === this.props.store.editUserReducer.id) {
        thisUserSkillArray.push({id: skill.skill_id, description: skill.description});
      }
    });
    if(thisUserSkillArray.some(skill => skill.id === skillItem.id)){
      return(
        <div  className="form-check">
          <input
            type="checkbox"
            value={skillItem.id}
            onChange={this.removeSkill}
            className="form-check-input"
            id="flexCheckChecked"
            defaultChecked
            />
          <label 
            className="form-check-label"
            for="flexCheckChecked">
            {skillItem.description}
          </label>
        </div>
      );
    } else {
      return (
        <div  className="form-check">
          <input
            type="checkbox"
            value={skillItem.id}
            onChange={this.addSkill}
            className="form-check-input"
            id="flexCheckDefault"   
            />
          <label 
            className="form-check-label"
            for="flexCheckDefault">
            {skillItem.description}
          </label>
        </div>
      );
    }
  }

  handleChange = (event, typeParam) => {
    console.log(event.target.value, typeParam);
    this.setState( {
        [typeParam]: event.target.value
    });
  }

  // This function checks to make sure there is text in the required inputs
  // and returns true if there is and false if not
  inputCheck = () => {
    if (this.state.first_name && this.state.last_name && this.state.email 
    && this.state.phone) {
      return true;
    }
    else {
      return false;
    }
  }

  // check values and send to database if valid
  submitEdit = () => {
    // check for all the required fields filled out
    // returns true if inputs are ok
    let inputCheckResult = this.inputCheck();
    if (!inputCheckResult) {
      swal('Please make sure all of the required fields are filled out.');
      return
    }
    else {
      console.log('editing user');
      this.props.dispatch( {type: 'SUBMIT_EDIT_USER', payload: this.state} );
      this.props.history.push('/edit');
    }
  }

    // sends a new skill row to the user_skill table
    addSkill = (event) => {
      const newSkill = {
        userId: this.props.store.editUserReducer.id,
        skillId: Number(event.target.value)
      }
      this.props.dispatch({
        type: 'ADD_SKILL',
        payload: newSkill
      })
    }
    // removes a skill from the user_skill table
    removeSkill = (event) => {
      const deleteSkill = {
        userId: this.props.store.editUserReducer.id,
        skillId: Number(event.target.value)
      }
      this.props.dispatch({
        type: 'REMOVE_SKILL',
        payload: deleteSkill
      })
    }

  goBack = () => {
    this.props.history.push('/edit');
  }

  // This function handles the changes for the radio buttons
  handlOptionChange = (event) => {
    console.log("name", event.target.name);
    console.log("value", event.target.value);
    // The values are adjusted slightly here for if a user's on patrol 
    // on call status is adjusted
    if (event.target.name === "patrol_call") {
      if (event.target.value == 1) {
        this.setState({
          on_patrol: true,
          on_call: false
        });
      }
      else if (event.target.value == 2) {
        this.setState({
          on_patrol: false,
          on_call: true
        });
      }
      else if (event.target.value == 3) {
        this.setState({
          on_patrol: false,
          on_call: false
        });
      }
    }
    // if either of the radios besides 'on patrol' / 'on call'
    else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  // This function edits the value sent or stored as the phone number
  setPhoneValue = (phoneNumber) => {
    console.log(phoneNumber);
    this.setState({
      phone: phoneNumber
    })
  }

  render() {
    return (
      <div>
        {this.props.store.editUserReducer ? 
          <div className="editModal">
            <div>
            <p>Username: {this.state.username}</p>
            </div>
            <div>
            <label>First Name:</label>
            <input defaultValue={this.props.store.editUserReducer.first_name} onChange={(event) => this.handleChange(event, 'first_name')} type="text"></input>
            </div>
            <div>
            <label>Last Name:</label>
            <input defaultValue={this.props.store.editUserReducer.last_name} onChange={(event) => this.handleChange(event, 'last_name')} type="text"></input>
            </div>
            <div>
            <label>Address:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input defaultValue={this.props.store.editUserReducer.address} onChange={(event) => this.handleChange(event, 'address')} type="text"></input>
            </div>
            <div>
            <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input defaultValue={this.props.store.editUserReducer.email} onChange={(event) => this.handleChange(event, 'email')} type="text"></input>
            </div>
            <div>
            <label>Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <PhoneInput 
              country="US"
              value={this.state.phone}
              onChange={this.setPhoneValue}
              maxlength="14"
            />
            </div>
            <br/>
            {/* Adult Section */}
            <label>Is the user an adult?:</label>
            <div className="form-check">
              <label>
                <input 
                  type="radio"
                  name="adult"
                  value={true}
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
                  value={false}
                  checked={this.state.adult == false || this.state.adult == "false"}
                  onChange={this.handlOptionChange}
                  className="form-check-input"
                />
                No
              </label>
            </div>
            <br/>
            {/* On Patrol / On Call Section */}
            <label htmlFor="patrolRadios">Current Status:</label>
            <div className="form-check">
              <label>
                <input 
                  type="radio"
                  name="patrol_call"
                  value={1}
                  checked={this.state.on_patrol == true || this.state.on_patrol == "true"}
                  onChange={this.handlOptionChange}
                  className="form-check-input"
                />
                On Patrol
              </label>
            </div>
            <div className="form-check">
              <label>
                <input 
                  type="radio"
                  name="patrol_call"
                  value={2}
                  checked={this.state.on_call == true || this.state.on_call == "true"}
                  onChange={this.handlOptionChange}
                  className="form-check-input"
                />
                On Call
              </label>
            </div>
            <div className="form-check">
              <label>
                <input 
                  type="radio"
                  name="patrol_call"
                  value={3}
                  checked={(this.state.on_patrol == false || this.state.on_patrol == "false") && 
                  (this.state.on_call == false || this.state.on_call == "false")}
                  onChange={this.handlOptionChange}
                  className="form-check-input"
                />
                Off Duty
              </label>
            </div>
            <br/>
            <label>User's Skills:</label>
            {/* Skills section */}
            <div>
              {this.props.store.allSkillsReducer.map((skill) => {
                return this.renderSkills(skill);
              })}
            </div>
            {/* Role Section */}
            <br/>
            <label>Role:</label>
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
            <div className="form-check">
              <label>
                <input 
                  type="radio"
                  name="role"
                  value={0}
                  checked={this.state.role == 0}
                  onChange={this.handlOptionChange}
                  className="form-check-input"
                />
                Interested in Volunteering for PSC
              </label>
            </div>
            <br/>
            <Button onClick={this.submitEdit} variant="primary">Submit Edit</Button>
            <br/>
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