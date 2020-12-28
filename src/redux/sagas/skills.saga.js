import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';


// function to fetch all the rows from the user_skills table in the DB
function* fetchUserSkills() {
  try{
    const skillsResults = yield axios.get('/api/skills/user');
    yield put ({type: 'SET_USER_SKILLS', payload: skillsResults.data})
  }catch(error) {
    console.log('error in fetch skills', error);
  }
}

// function to fetch ALL possible skills from skills table
function * fetchAllSkills() {
  try{
    const results = yield axios.get('/api/skills');
    yield console.log('ALL THE SKILLS ARE', results.data);
    yield put ({type: 'SET_ALL_SKILLS', payload: results.data})
  }catch(error) {
    console.log('Error is fetching all skills');
  }
}

function* skillsSaga(){
  yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills);
  yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills)
}
export default skillsSaga;