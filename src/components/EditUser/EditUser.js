import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditUserItem from '../EditUserItem/EditUserItem'; // mapped out user data for the table
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

       // below are functions used to sort user table by column
      // sortByUsername = () => {
      //   this.props.dispatch( {type:'SORT_USERNAME'} );
      // }
      // sortByFirstName = () => {
      //   this.props.dispatch( {type:'SORT_FIRST_NAME'} );
      // }
      // sortByLastName = () => {
      //   this.props.dispatch( {type:'SORT_LAST_NAME'} );
      // }
      // sortByAddress = () => {
      //   this.props.dispatch( {type:'SORT_ADDRESS'} );
      // }
      // sortByEmail = () => {
      //   this.props.dispatch( {type:'SORT_EMAIL'} );
      // }
      // sortByPhone = () => {
      //   this.props.dispatch( {type:'SORT_PHONE'} );
      // }
      // sortByAdult = () => {
      //   this.props.dispatch( {type:'SORT_ADULT'} );
      // }
      // sortBySkills = () => {
      //   this.props.dispatch({ type: 'SORT_SKILLS'});
      // } THIS NEEDS tweaking because it's a many-many
      // sortByRole = () => {
      //   this.props.dispatch( {type:'SORT_ROLE'} );
      // }
      // sortByOnPatrol = () => {
      //   this.props.dispatch( {type:'SORT_ON_PATROL'} );
      // }
      // sortByOnCall = () => {
      //   this.props.dispatch( {type:'SORT_ON_CALL'} );
      // }
      // end of sorting functions

  render() {
    return (
      <div>
        <h2 className="tabletitle">User Table</h2>
            <EditUserTABLE user={this.props.store.allUsersReducer}/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUser);

