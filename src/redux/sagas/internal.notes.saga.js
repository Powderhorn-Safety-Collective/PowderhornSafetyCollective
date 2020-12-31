import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// this function will add internal PSC Notes to the internal_notes table for a specific incident
function* addNote(action) {
  try {
    yield axios.post('/api/notes', action.payload);
    yield put({type: 'GET_NOTES'})
  }
  catch(error) {
    console.log('error in add note incidentSaga', error);    
  }
}
// this function retrieves all notes from the internal Notes table for a given incident
function* getNotes() {
  const response = yield axios.get('/api/notes');
  yield put({type: 'SET_NOTES', payload: response.data})
}

function* internalNoteSaga() {
  yield takeEvery('ADD_NOTE', addNote);
  yield takeEvery('GET_NOTES', getNotes);
}

export default internalNoteSaga;