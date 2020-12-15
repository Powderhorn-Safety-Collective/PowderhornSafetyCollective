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

function* incidentSaga() {
    yield takeLatest('GET_INCIDENTS', fetchIncidents); // command to retrieve all incident data from database
}

export default incidentSaga;