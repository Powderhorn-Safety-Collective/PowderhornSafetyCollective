import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditUserItem from '../EditUserItem/EditUserItem'; // mapped out user data for the table

class EditUser extends Component {
  
    state = {
      username: '',
      first_name: '',
      last_name: '',
      address: '',
      email: '',
      adult: '',
      on_patrol: '',
      on_call: ''
    }

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getUsers();
      }

      componentDidUpdate = () => {
        this.props.dispatch( {type: 'EDIT_USER', payload: this.props.store.allUsersReducer} );
      }

    // function to fetch all incident data
    getUsers = () => {
        this.props.dispatch( {type: 'GET_ALL_USERS'});
    }

       // below are functions used to sort user table by column
       sortByUsername = () => {
        this.props.dispatch( {type:'SORT_USERNAME'} );
      }
      sortByFirstName = () => {
        this.props.dispatch( {type:'SORT_FIRST_NAME'} );
      }
      sortByLastName = () => {
        this.props.dispatch( {type:'SORT_LAST_NAME'} );
      }
      sortByAddress = () => {
        this.props.dispatch( {type:'SORT_ADDRESS'} );
      }
      sortByEmail = () => {
        this.props.dispatch( {type:'SORT_EMAIL'} );
      }
      sortByPhone = () => {
        this.props.dispatch( {type:'SORT_PHONE'} );
      }
      sortByAdult = () => {
        this.props.dispatch( {type:'SORT_ADULT'} );
      }
      sortByOnPatrol = () => {
        this.props.dispatch( {type:'SORT_ON_PATROL'} );
      }
      sortByOnCall = () => {
        this.props.dispatch( {type:'SORT_ON_CALL'} );
      }
      // end of sorting functions

      submitEdit = () => {
        console.log('editing user');
        // this.props.dispatch( {type: 'EDIT_USER'} );
      }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.store.editUserReducer)}
        <h2>Edit User Page</h2>
        <table>
                <thead>
                    <tr>
                        <th onClick={this.getUsers}>Id</th>
                        <th onClick={this.sortByUsername}>Username</th>
                        <th onClick={this.sortByFirstName}>First Name</th>
                        <th onClick={this.sortByLastName}>Last name</th>
                        <th onClick={this.sortByAddress}>Address</th>
                        <th onClick={this.sortByEmail}>Email</th>
                        <th onClick={this.sortByPhone}>Phone</th>
                        <th onClick={this.sortByAdult}>Adult</th>
                        <th onClick={this.sortByOnPatrol}>On Patrol</th>
                        <th onClick={this.sortByOnCall}>On Call</th>
                        <th onClick={() => this.editUser(this.props.user)}>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map through allUsersReducer data and passing it along to EditUserItem */}
                    {this.props.store.allUsersReducer.map( (user, index) => {
                        return(
                            <EditUserItem user={user} key={index}/>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="12"></td>
                    </tr>
                </tfoot>
            </table>

                    {this.props.store.editUserReducer ? 
                    <div>
                    <input value={this.props.store.editUserReducer.username} type="text" data=''></input>
                    <input value={this.props.store.editUserReducer.first_name} type="text"></input>
                    <input value={this.props.store.editUserReducer.last_name} type="text"></input>
                    <input value={this.props.store.editUserReducer.address} type="text"></input>
                    <input value={this.props.store.editUserReducer.email} type="text"></input>
                    <input value={this.props.store.editUserReducer.adult} type="text"></input>
                    <input value={this.props.store.editUserReducer.on_patrol} type="text"></input>
                    <input value={this.props.store.editUserReducer.on_call} type="text"></input>
                    <input value='role' type="text"></input>
                    <button onClick={this.submitEdit}>Submit Edit</button>
                    </div>
                  :
                  <></>
                  }
            
           
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUser);

