// reducer to store all users data, rather than just the data of the logged in user
const allUsersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_USERS':
        return action.payload;
      case 'UNSET_ALL_USERS': // to unset all user data
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.allUsersReducer
  export default allUsersReducer;