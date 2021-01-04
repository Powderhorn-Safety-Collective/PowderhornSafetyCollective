// this reducer stores the client_id from the database or -1 if 
// client_id not in db yet

const clientIdReducer = (state = -1, action) => {
  switch (action.type) {
      case 'SET_CLIENT_ID':
          return action.payload;
      case 'UNSET_CLIENT_ID':
          return -1;
      default:
          return state;
  }
}


export default clientIdReducer;