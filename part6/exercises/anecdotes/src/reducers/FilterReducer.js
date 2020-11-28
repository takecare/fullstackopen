const initialState = "";

export const createUpdateFilterAction = (content) => ({
  type: "UPDATE_FILTER",
  data: { content },
});

export const createClearFilterAction = () => ({
  type: "CLEAR_FILTER",
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return {
        ...state,
        filter: action.data.content,
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        filter: "",
      };
    default:
      return state;
  }
};

export default reducer;
