// import axios from 'axios';
// import {put, takeEvery } from 'redux-saga/effects';

// function* fetchPatrol() {
//   try{
//     const patrol = yield axios.get('/api/patrol');
//     yield console.log('THE COUNT IS', patrol.data)
//     yield put({type: 'SET_PATROL', payload: patrol.data});
//   }catch(error){
//     console.log('error in fetch patrol', error); 
//   }
// }


// function* patrolSaga() {
//   yield takeEvery('FETCH_PATROL', fetchPatrol);
// }


// export default patrolSaga;