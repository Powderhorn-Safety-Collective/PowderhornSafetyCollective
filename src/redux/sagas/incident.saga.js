import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

// this function grabs all incidents data from the incident table
// then passes all data along to incidentReducer
function* fetchIncidents() {
  try {
    const response = yield axios.get('/api/incident');
    console.log(response.data);
    yield put ( {type:'SET_INCIDENTS', payload: response.data} );
  } catch (error) {
    console.log(error);
  }
}

// this function grabs all incidents data from the incident table
// if view_publicly is set to true then passes all data along to publicIncidentReducer
function* fetchPublicIncidents() {
  try {
    const response = yield axios.get('/api/incident/public');
    console.log('public response data', response.data);
    yield put ( {type:'SET_PUBLIC_INCIDENTS', payload: response.data} );
  } 
  catch (error) {
    console.log(error);
  }
}

//fetches the searched incident based on the 6 digit incident ID
function* fetchSearchedIncident(action) {
  try{
    const incidentResponse = yield axios.get(`/api/incident/search/${action.payload.searchNumber}`)
    if(incidentResponse.data === "") {
      yield put({type: 'SET_SEARCHED_INCIDENT', payload: ""}) 
    }else {
      yield put({type: 'SET_SEARCHED_INCIDENT', payload: incidentResponse.data});
    }
  }catch(error){
    console.log('error in search incident saga');
  }
}

// function to fetch the count of all active incidents
function* fetchActive() {
  try {
    const response = yield axios.get('/api/incident/active');
    yield put ( {type:'SET_ACTIVE_INCIDENTS', payload: response.data[0].active} );
  } catch (error) {
    console.log(error);
  }
}

// function to post client's incident data to database
function* postIncident(action) {
  console.log(action.payload);
  try {
    yield axios.post('/api/incident', action.payload);
    yield put( {type: 'GET_INCIDENTS'} );
  } catch (error) {
    console.log(error);
  }
}

function* editIncident(action) {
  console.log('SAGA', action.payload);
  
  try {
    yield axios.put(`/api/incident/editIncident/${action.payload.id}`, action.payload)
    yield put({type: 'GET_INCIDENTS'});
    yield put({type: 'GET_ACTIVE'});
  }
  catch (error){
      console.log('user edit failed', error);
  }
}

 // function to update text displayed publicly about an incident
 function* updatePublicText(action) {
   console.log('updatePublicText action.payload', action.payload);
   try {
    yield axios.put('/api/incident/publicText', action.payload);
    yield put({type: 'GET_INCIDENTS'});
    swal('Text has been saved', "", "success");
   }
   catch (error) {
     console.log('error from update public text saga', error);
   }
 }

  // this function will toggle the active state of the incident
  function* updateActiveStatus(action) {
    console.log('updateActiveStatus', action.payload);
    try {
      yield axios.put('/api/incident/active', action.payload);
      yield put({type: 'GET_INCIDENTS'});
    }
    catch (error) {
      console.log('error in updateActiveStatus fn', error);
    }
  }

  
  // This function toggles booleans for values that select which items are displayed in 
  // incident public postings
  function* updatePublicPost(action) {
    console.log('updatePublicPost', action.payload);
    try {
      yield axios.put('api/incident/publicPost', action.payload);
      yield put({type: 'GET_INCIDENTS'})
      swal('Post updated.', '', "success");
    }
    catch (error) {
      console.log('error in updatePublicPost fn', error);      
    }
  }

  // function to assign a PSC member to an incident
  function* addAssigned(action) {
    try {
      yield axios.put('api/incident/assign', action.payload)
    }catch (error) {
      console.log('error in assign saga', error);
    }
  }

  function* updateDuplicate(action) {
    console.log('updateDuplicate', action.payload);
    try {
      yield axios.put('api/incident/duplicate', action.payload);
      yield put({type: 'GET_INCIDENTS'});
    }
    catch (error){
      console.log('error in updateDuplicate fn', error);
      
    }
  }

  // function to get incidents submitted by user or followed by user
function* fetchPersonalIncidents(action) {
  console.log('fetch Personal Incidents fn with payload', action.payload);
  try {
    const personalResponse = yield axios.get(`api/incident/personal/${action.payload.id}`);
    console.log('personal incidents', personalResponse.data);
    yield put({type: 'SET_PERSONAL_INCIDENTS', payload: personalResponse.data});
  }
  catch (error) {
    console.log('error in fetch Personal Incidents fn', error);
  }
}

// below are the functions used to sort the incident table by column
function* sortType() {
  try {
      const response = yield axios.get('/api/incident/sort/type');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortNotes() {
  try {
      const response = yield axios.get('/api/incident/sort/notes');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortLocation() {
  try {
      const response = yield axios.get('/api/incident/sort/location');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortTime() {
  try {
      const response = yield axios.get('/api/incident/sort/time_submitted');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortStatus() {
  try {
      const response = yield axios.get('/api/incident/sort/status');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortPublic() {
  try {
      const response = yield axios.get('/api/incident/sort/view_publicly');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortResponder() {
  try {
      const response = yield axios.get('/api/incident/sort/responder_notes');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortDuplicate() {
  try {
      const response = yield axios.get('/api/incident/sort/duplicate_entry');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortClient() {
  try {
      const response = yield axios.get('/api/incident/sort/client_id');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortSubmittedUser() {
  try {
      const response = yield axios.get('/api/incident/sort/submitted_user');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
// end of sorting sagas

  // functions to edit incidents
  function* editActiveStatus(action) {
    console.log('updateActiveStatus', action.payload, action.id);
    try {
      yield axios.put(`/api/incident/editactive/${action.id}`, action);
      yield put({type: 'GET_INCIDENTS'});
    }
    catch (error) {
      console.log('error in updateActiveStatus fn', error);
    }
  }
  function* editPublicStatus(action) {
    console.log('updateActiveStatus', action.payload, action.id);
    try {
      yield axios.put(`/api/incident/editpublic/${action.id}`, action);
      yield put({type: 'GET_INCIDENTS'});
    }
    catch (error) {
      console.log('error in updateActiveStatus fn', error);
    }
  }
  function* editDuplicateStatus(action) {
    console.log('updateActiveStatus', action.payload, action.id);
    try {
      yield axios.put(`/api/incident/editduplicate/${action.id}`, action);
      yield put({type: 'GET_INCIDENTS'});
    }
    catch (error) {
      console.log('error in updateActiveStatus fn', error);
    }
  }
// this function sends the client_id to the database and it is returned
// if it exists in the database already, otherwise, an empty array is returned
// and the reducer remains the same, with -1 as its state
function* getClient(action) {
  try{
    console.log('get client action.payload', action.payload);
    const response = yield axios.get(`/api/incident/client_id/${action.payload}`);
    console.log('response in get client fn', response.data[0].client_id);
    yield put({type: 'SET_CLIENT_ID', payload: response.data[0].client_id});
  }
  catch (error) {
    console.log('error get client id fn', error);
    
  }
}

function* incidentSaga() {
    yield takeLatest('GET_INCIDENTS', fetchIncidents); // command to retrieve all incident data from database
    yield takeLatest('POST_INCIDENT', postIncident); // command to post new incident to database
    yield takeEvery('GET_PUBLIC_INCIDENTS', fetchPublicIncidents);
    yield takeEvery('UPDATE_PUBLIC_DISPLAY_TEXT', updatePublicText);
    yield takeEvery('UPDATE_ACTIVE_STATUS', updateActiveStatus);
    yield takeEvery('UPDATE_PUBLIC_POST', updatePublicPost);
    yield takeEvery('MARK_DUPLICATE', updateDuplicate);
    yield takeEvery('GET_PERSONAL_INCIDENTS', fetchPersonalIncidents);
    yield takeEvery('ADD_ASSIGNED', addAssigned);
    

    yield takeEvery('GET_ACTIVE', fetchActive); // commmand to GET all active incidents

    yield takeEvery('FETCH_SEARCHED_INCIDENT', fetchSearchedIncident)

    // below are all the yields to sort incident table by column
    yield takeLatest("SORT_CLIENT", sortClient);
    yield takeLatest("SORT_TYPE", sortType);
    yield takeLatest("SORT_NOTES", sortNotes);
    yield takeLatest("SORT_LOCATION", sortLocation);
    yield takeLatest("SORT_TIME", sortTime);
    yield takeLatest("SORT_STATUS", sortStatus);
    yield takeLatest("SORT_PUBLIC", sortPublic);
    yield takeLatest("SORT_RESPONDER", sortResponder);
    yield takeLatest("SORT_DUPLICATE", sortDuplicate);
    yield takeEvery('SORT_SUBMITTED_USER', sortSubmittedUser);

    yield takeLatest("SUBMIT_EDIT_INCIDENT", editIncident); // for edit of incidents

    yield takeLatest("EDIT_ACTIVE", editActiveStatus); // edit incident collapse table
    yield takeLatest("EDIT_PUBLIC", editPublicStatus); // edit incident collapse table
    yield takeLatest("EDIT_DUPLICATE", editDuplicateStatus); // edit incident collapse table
    yield takeEvery('GET_CLIENT', getClient);
}

export default incidentSaga;