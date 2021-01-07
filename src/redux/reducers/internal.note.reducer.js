// this reducer stores all internal notes
const internalNoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return action.payload;
    default:
      return state;
  }
}

export default internalNoteReducer;