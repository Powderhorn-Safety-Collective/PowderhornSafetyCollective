import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

// import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CommunityPage from '../CommunityPage/CommunityPage';
import MemberPage from '../MemberPage/MemberPage';
import AdminPage from '../AdminPage/AdminPage';


import Header from '../Header/Header.js';
import History from '../IncidentHistoryPage/IncidentHistoryPage'; // Component to display incident table data
import EditUser from '../EditUser/EditUser'; // Component to display all user data in a table
import EditUserModal from '../EditUserModal/EditUserModal' // modal to finalize edits
import EditIncidentModal from '../EditIncidentModal/EditIncidentModal' // modal to finalize edits
import ReportIncident from '../ReportIncident/ReportIncident'; // for users to report new incidents

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
            exact
            path="/community"
            component={CommunityPage}
            />
            {/* route leading to incident history page */}
            <Route
              exact 
              path="/report" 
              component={ReportIncident} 
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/member"
              component={MemberPage}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/admin"
              component={AdminPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/user"
            />

            {/* route leading to incident history page */}
            <ProtectedRoute
              exact 
              path="/history" 
              component={History} 
            />

            {/* route leading to incident history page */}
            <ProtectedRoute
              exact 
              path="/edit" 
              component={EditUser} 
            />

            {/* route leading to incident history page */}
            <ProtectedRoute
              exact 
              path="/editUserModal" 
              component={EditUserModal} 
            />

            {/* route leading to incident history page */}
            <ProtectedRoute
              exact 
              path="/editIncidentModal" 
              component={EditIncidentModal} 
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
