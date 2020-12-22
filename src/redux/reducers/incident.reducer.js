// this reducer stores history of all incidents from all users

const incidentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INCIDENTS':
            return action.payload;
        // UNSET_INCIDENTS can be called to remove all data from reducer
        case 'UNSET_INCIDENTS':
            return [];
        default:
            return state;
    }
}



  // admin will be on the redux state at:
  // state.incident
  export default incidentReducer;