import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

// below are the functions used to sort the incident table by column
function* sortType() {
  try {
      const response = yield axios.get('/api/incident/type');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortNotes() {
  try {
      const response = yield axios.get('/api/incident/notes');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortLocation() {
  try {
      const response = yield axios.get('/api/incident/location');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortTime() {
  try {
      const response = yield axios.get('/api/incident/time_submitted');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortStatus() {
  try {
      const response = yield axios.get('/api/incident/status');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortPublic() {
  try {
      const response = yield axios.get('/api/incident/view_publicly');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortResponder() {
  try {
      const response = yield axios.get('/api/incident/responder_notes');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortDuplicate() {
  try {
      const response = yield axios.get('/api/incident/duplicate_entry');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortClient() {
  try {
      const response = yield axios.get('/api/incident/client_id');
      yield put ( {type:'SET_INCIDENTS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
// end of sorting sagas

function* incidentSaga() {
    yield takeLatest('GET_INCIDENTS', fetchIncidents); // command to retrieve all incident data from database
    yield takeLatest('POST_INCIDENT', postIncident); // command to post new incident to database

    // below are all the yields to sort incident table by column
    yield takeLatest("SORT_TYPE", sortType);
    yield takeLatest("SORT_NOTES", sortNotes);
    yield takeLatest("SORT_LOCATION", sortLocation);
    yield takeLatest("SORT_TIME", sortTime);
    yield takeLatest("SORT_LOCATION", sortStatus);
    yield takeLatest("SORT_PUBLIC", sortPublic);
    yield takeLatest("SORT_RESPONDER", sortResponder);
    yield takeLatest("SORT_DUPLICATE", sortDuplicate);
    yield takeLatest("SORT_CLIENT", sortClient);
}

export default incidentSaga;