import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';


// function to fetch all the rows from the user_skills table in the DB
function* fetchUserSkills() {
  try{
    const skillsResults = yield axios.get('/api/skills/user');
    yield console.log('ALL THE USERS SKILLS ARE', skillsResults.data);
    yield put ({type: 'SET_SKILLS', payload: skillsResults.data})
  }catch(error) {
    console.log('error in fetch skills', error);
  }
}

function* skillsSaga(){
  yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills);
}
export default skillsSaga;