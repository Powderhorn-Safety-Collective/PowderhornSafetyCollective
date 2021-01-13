// reducer to store data for the incident being edited
const patrolCountReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PATROL_COUNT':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.editIncidentReducer
export default patrolCountReducer;