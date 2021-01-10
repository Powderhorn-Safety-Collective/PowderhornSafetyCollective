import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditUserTABLE from '../EditUserTABLE/EditUserTABLE';

class EditUser extends Component {

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getUsers();
        this.getUserSkills();
      }

    // function to fetch all incident data
    getUsers = () => {
        this.props.dispatch( {type: 'GET_ALL_USERS'});
    }

    getUserSkills = () => {
      this.props.dispatch({type: 'FETCH_USER_SKILLS'});
    }

  render() {
    return (
      <div>
        <h2 className="centerClass">User Table</h2>
        <h3 className="centerClass">Click on a column's heading to sort by that data type.</h3>
            <EditUserTABLE className="blackdrop" user={this.props.store.allUsersReducer} skills={this.props.store.userSkillsReducer}/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUser);

