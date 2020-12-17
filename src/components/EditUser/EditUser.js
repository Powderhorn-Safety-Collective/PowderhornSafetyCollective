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
      on_call: '',
      role: ''
    }

    handleChange = (event, typeParam) => {
      console.log(event.target.value, typeParam);
    
      this.setState( {
          [typeParam]: event.target.value
      })
    }
    
    submitEdit = () => {
      console.log('editing user');
      // this.props.dispatch( {type: 'EDIT_USER'} );
    }
    

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getUsers();
      }

      // keep this commented out for now
      // componentDidUpdate = () => {
      //   this.props.dispatch( {type: 'EDIT_USER', payload: this.props.store.allUsersReducer} );
      // }

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
      sortByRole = () => {
        this.props.dispatch( {type:'SORT_ROLE'} );
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
        <p>editUserReducer:</p>
        {JSON.stringify(this.props.store.editUserReducer)}
        <h2>Edit User Page</h2>
        <p>state:</p>
        {JSON.stringify(this.state)}
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
                        <th onClick={this.sortByRole}>Role</th>
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
            <br/>

                    {this.props.store.editUserReducer ? 
                    <div className="editModal">
                    <label>Username</label>
                    <input defaultValue={this.props.store.editUserReducer.username} onChange={(event) => this.handleChange(event, 'username')} type="text"></input>
                    <br/>
                    <label>First Name</label>
                    <input defaultValue={this.props.store.editUserReducer.first_name} onChange={(event) => this.handleChange(event, 'first_name')} type="text"></input>
                    <br/>
                    <label>Last Name</label>
                    <input defaultValue={this.props.store.editUserReducer.last_name} onChange={(event) => this.handleChange(event, 'last_name')} type="text"></input>
                    <br/>
                    <label>Address</label>
                    <input defaultValue={this.props.store.editUserReducer.address} onChange={(event) => this.handleChange(event, 'address')} type="text"></input>
                    <br/>
                    <label>Email</label>
                    <input defaultValue={this.props.store.editUserReducer.email} onChange={(event) => this.handleChange(event, 'email')} type="text"></input>
                    <br/>
                    <label>Adult</label>
                    <input defaultValue={this.props.store.editUserReducer.adult} onChange={(event) => this.handleChange(event, 'adult')} type="text"></input>
                    <br/>
                    <label>On Patrol</label>
                    <input defaultValue={this.props.store.editUserReducer.on_patrol} onChange={(event) => this.handleChange(event, 'on_patrol')} type="text"></input>
                    <br/>
                    <label>On Call</label>
                    <input defaultValue={this.props.store.editUserReducer.on_call} onChange={(event) => this.handleChange(event, 'on_call')} type="text"></input>
                    <br/>
                    <label>Role</label>
                    <input defaultValue={this.props.store.editUserReducer.role} onChange={(event) => this.handleChange(event, 'role')} type="text"></input>
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

export default connect(mapStoreToProps)(EditUser);

