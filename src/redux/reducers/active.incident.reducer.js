// this reducer stores the count of all incidents from all users

const activeIncidentReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_INCIDENTS':
            return action.payload;
        // UNSET_ACTIVE_INCIDENTS can be called to remove all data from reducer
        // case 'UNSET_ACTIVE_INCIDENTS':
        //     return 0;
        default:
            return state;
    }
}

  // admin will be on the redux state at:
  // state.activeIncidentReducer
  export default activeIncidentReducer;