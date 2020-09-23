const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];
    case "TOGGLE_IMPORTANCE":
      const id = action.data.id;
      return state.map((note) => {
        if (note.id === id) {
          return { ...note, important: !note.important };
        }
        return note;
      });
    default:
      return state;
  }
};

export default noteReducer;
