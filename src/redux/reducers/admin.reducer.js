// holds a list of all the admins and phone numbers
const adminReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_ADMINS':
      return action.payload;
    default: 
      return state;
  }
}

export default adminReducer;