import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };
// login function
  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
          specialIncident: this.props.store.specialIncidentReducer
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login
// updates localstate with user input
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="loginForm" onSubmit={this.login}>
        <h2>Login</h2>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder=" Username"
              required
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder=" Password"

              required
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <input className="btn btn-primary" type="submit" name="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
