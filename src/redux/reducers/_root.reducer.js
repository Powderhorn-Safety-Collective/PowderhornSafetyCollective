import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import patrolCountReducer from './patrol.count.reducer';
import incidentReducer from './incident.reducer'; // reducer to hold onto all incident data from all users
import publicIncidentReducer from './public.incident.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  patrolCountReducer,
  incidentReducer, // reducer storing history of all incidents
  publicIncidentReducer, // reducer storing all publicly viewed incidents
});

export default rootReducer;
