export const createDisplayMessageAction = (message, timeout) => ({
  type: "MESSAGE",
  data: { message, timeout },
});

export const createHideMessageAction = () => ({
  type: "HIDE",
  data: { message: "", timeout: null },
});

const initialState = {
  message: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGE":
      return {
        ...state,
        timeout: action.data.timeout,
        message: action.data.message,
      };
    case "HIDE":
      clearTimeout(state.timeout);
      return {
        ...state,
        timeout: null,
        message: "",
      };
    default:
      return state;
  }
};

export default reducer;
