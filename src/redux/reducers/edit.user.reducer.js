// reducer to store all users data, rather than just the data of the logged in user
const editUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'EDIT_USER':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.allUsersReducer
  export default editUserReducer;