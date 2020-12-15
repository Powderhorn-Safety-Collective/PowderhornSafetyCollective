
// this reducer stores history of all publlic incidents from all users
const publicIncidentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PUBLIC_INCIDENTS':
      return action.payload;
    // UNSET_INCIDENTS can be called to remove all data from reducer
    // unsure if this should stay or go
    // case 'UNSET_INCIDENTS':
      // return [];
    default:
      return state;
  }
}

export default publicIncidentReducer;