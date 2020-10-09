export const createDisplayMessageAction = (message) => ({
  type: "MESSAGE",
  message,
});
export const createHideMessageAction = () => ({ type: "HIDE", message: "" });

const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.data.message;
    case "HIDE":
      return "";
    default:
      return state;
  }
};

export default reducer;
