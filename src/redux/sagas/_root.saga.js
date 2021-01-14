import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import statusSaga from './status.saga';
import internalNoteSaga from './internal.notes.saga';
import skillsSaga from './skills.saga';
import incidentSaga from './incident.saga'; // saga used for data relating to incident table
import followSaga from './follow.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),//saga that will direct registration traffic
    userSaga(), //saga that will direct user traffic
    incidentSaga(), // saga for all things relating to incidents
    statusSaga(), //saga for status
    internalNoteSaga(), //saga for internal notes
    skillsSaga(), //saga for skills
    followSaga(), //saga for followed incidents
  ]);
}
