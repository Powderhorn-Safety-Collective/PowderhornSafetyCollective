import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    phone: '',
    adult: '',
    terms: '',
    volunteer: '',
  };

  // function to register new user
  registerUser = (event) => {
    event.preventDefault();
    if(this.state.terms === 'yes') {
      console.log('user agreed to terms');
      this.props.dispatch({
      type: 'REGISTER',
      payload: this.state
      });
    }
    else {
      alert('Please read and sign the terms and conditions.')
    }
  }; // end registerUser

  // function to accept input fields
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
            {/* basic new user form */}
          <div>
            <input 
              type="text" 
              placeholder="Username" 
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="First Name" 
              value={this.state.first_name}
              required
              onChange={this.handleInputChangeFor('first_name')}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Last Name" 
              value={this.state.last_name}
              required
              onChange={this.handleInputChangeFor('last_name')}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Address" 
              value={this.state.address}
              required
              onChange={this.handleInputChangeFor('address')}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Email" 
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Phone" 
              value={this.state.phone}
              required
              onChange={this.handleInputChangeFor('phone')}
            />
          </div>
            {/* input to verify age */}
          <div>
            <label>Are you at least 18?</label>
            <input 
              type="radio" 
              id="yes" 
              name="adult" 
              value="yes"
              onChange={this.handleInputChangeFor('adult')}
            />
            <label htmlFor="yes">Yes</label>
            <input 
              type="radio" 
              id="no" 
              name="adult" 
              value="no"
              onChange={this.handleInputChangeFor('adult')}
            />
            <label htmlFor="no">No</label>
          </div>
          <div>
            <p>Terms and Conditions:</p>
            <p>
              {/* replace this text!! */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra
              lacus ut ex molestie blandit. Etiam et turpis sit amet risus
              mollis interdum. Suspendisse et justo vitae metus bibendum
              fringilla sed sed justo. Aliquam sollicitudin dapibus lectus,
              vitae consequat odio elementum eget. Praesent efficitur eros vitae
              nunc interdum, eu interdum justo facilisis. Sed pulvinar nulla ac
              dignissim efficitur. Quisque eget eros metus. Vestibulum bibendum
              fringilla nibh a luctus. Duis a sapien metus.
            </p>
          </div>
            {/* terms and conditions */}
          <div>
            <input 
              type="radio" 
              id="terms" 
              name="terms" 
              value="yes" 
              onChange={this.handleInputChangeFor('terms')}/>
            <label htmlFor="terms">I accept the above terms and conditons*</label>
          </div>
            {/* option to learn more about volunteering */}
            {/* need to figure out volunteer angle */}
          <div>
            <input 
              type="checkbox" 
              id="volunteer" 
              name="volunteer"
              value="yes" 
              onChange={this.handleInputChangeFor('volunteer')}/>
            <label htmlFor="volunteer">I would like to learn more about how to volunteer</label>
          </div>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);