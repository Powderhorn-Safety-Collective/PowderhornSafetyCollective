// reducer to store data for the incident being edited
const editIncidentReducer = (state = {}, action) => {
    switch (action.type) {
      case 'EDIT_INCIDENT':
        return action.payload;
    // UNSET_EDIT_INCIDENT can be called to remove all data from reducer
      case 'UNSET_EDIT_INCIDENT':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.editIncidentReducer
  export default editIncidentReducer;