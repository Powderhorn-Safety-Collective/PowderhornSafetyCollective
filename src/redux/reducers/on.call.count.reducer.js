// reducer to store data for the incident being edited
const onCallCountReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ON_CALL_COUNT':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.editIncidentReducer
export default onCallCountReducer;