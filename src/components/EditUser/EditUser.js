import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditUserItem from '../EditUserItem/EditUserItem'; // mapped out user data for the table

class EditUser extends Component {
  
    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getUsers();
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

  render() {
    return (
      <div>
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
                        <td colSpan="11"></td>
                    </tr>
                </tfoot>
            </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUser);

