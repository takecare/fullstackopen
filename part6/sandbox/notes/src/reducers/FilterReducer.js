const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const filterImportant = () => ({
  type: "SET_FILTER",
  filter: "IMPORTANT",
});

export const filterNotImportant = () => ({
  type: "SET_FILTER",
  filter: "NOT_IMPORTANT",
});

export const filterAll = () => ({
  type: "SET_FILTER",
  filter: "ALL",
});

export default filterReducer;
