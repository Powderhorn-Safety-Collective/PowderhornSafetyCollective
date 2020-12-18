// import axios from 'axios';
// import {put, takeEvery } from 'redux-saga/effects';

// function* fetchOnCall() {
//   try{
//     const onCallCount = yield axios.get('/api/oncall');
//     yield console.log('THE PEOPLE ON CALL', onCallCount.data)
//     yield put({type: 'SET_ONCALL', payload: onCallCount.data});
//   }catch(error){
//     console.log('error in fetch oncall', error); 
//   }
// }


// function* onCallSaga() {
//   yield takeEvery('FETCH_ONCALL', fetchOnCall);
// }


// export default onCallSaga;