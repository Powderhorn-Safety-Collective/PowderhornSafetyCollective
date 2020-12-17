// reducer to store data for the user being edited
const editUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'EDIT_USER':
        return action.payload;
    // UNSET_EDIT can be called to remove all data from reducer
      case 'UNSET_EDIT':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.editUserReducer
  export default editUserReducer;