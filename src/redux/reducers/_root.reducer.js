import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import patrolReducer from './patrol.reducer';//reducer to hold onpatrol count
import onCallReducer from './on.call.reducer';//reducer to hold onpatrol count
import incidentReducer from './incident.reducer'; // reducer to hold onto all incident data from all users
import publicIncidentReducer from './public.incident.reducer';
import activeIncidentReducer from './active.incident.reducer'; // reducer to hold the count of all active incidents
import allUsersReducer from './all.users.reducer'; // reducer storing all user data, not just the user logged in
import editUserReducer from './edit.user.reducer'; // reducer to help with edit user
import editIncidentReducer from './edit.incident.reducer'; // reducer to help with edit incident
import searchIncidentReducer from './search.incident.reducer';//holds the results of an incident search
import personalIncidentReducer from './personal.incident.reducer'; //holds the incidents submitted by a given user
import internalNoteReducer from './internal.note.reducer'; //holds the internal notes for a given incident
import userSkillsReducer from './user.skills.reducer'; //all the skills in the user_skills table
import allSkillsReducer from './all.skills.reducer'; //a list of all possible skills
import clientIdReducer from './client.id.reducer'; //holds the client id for a given incident
import specialIncidentReducer from './special.incident.reducer'; //holds data for an incident that is submitted by an unregistered user who decides to register DURING incident report
import followedIncidentsReducer from './followed.incidents.reducer'; //incidents that a given user is following
import combinedPatrolCallReducer from './comined.patrol.call.reducer'; //holds all patrolling and on call members
import patrolCountReducer from './patrol.count.reducer'; //holds the count of patrolling members
import onCallCountReducer from './on.call.count.reducer'; //holds the count of on_call members

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  patrolReducer,//count of on-patrol volunteers
  onCallReducer,//count of on-call volunteers
  incidentReducer, // reducer storing history of all incidents
  publicIncidentReducer, // reducer storing all publicly viewed incidents
  activeIncidentReducer, // reducer storing count of all active incidents
  allUsersReducer, // reducer storing all users
  editUserReducer, // reducer used to edit user
  editIncidentReducer, // reducer used to edit incident
  searchIncidentReducer,//holds the results of an incident search
  personalIncidentReducer, // reducer to hold incidents submitted or followed by user
  searchIncidentReducer,//reducer that holds a searched incident
  internalNoteReducer, //reducer that holds all PSC internal notes
  userSkillsReducer, //holds the skills and user data from the user_skills table
  allSkillsReducer, //holds ALL possible skills
  clientIdReducer, //holds the client id for a newly created incident
  specialIncidentReducer, //holds the client id when a user decides to register WHILE reporting an incident
  followedIncidentsReducer, //holds the followed incidents for a given user
  combinedPatrolCallReducer, //holds data for on patrol and on call members
  patrolCountReducer, //holds the patrol count
  onCallCountReducer, //holds the on_call count
});

export default rootReducer;
