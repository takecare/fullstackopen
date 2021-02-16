const generateId = () => (100000 * Math.random()).toFixed(0);

// state is an array of anectode objects

export const createLoadAction = (anecdotes) => ({
  type: "LOAD",
  data: { anecdotes },
});

export const createVoteAction = (id) => ({ type: "VOTE", data: { id } });

export const createAnecdoteAction = (content) => {
  return {
    type: "NEW",
    data: { content },
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD":
      return [].concat(action.data.anecdotes);
    case "VOTE":
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    case "NEW":
      const note = {
        content: action.data.content,
        id: generateId(),
        votes: 0,
      };
      return state.concat(note);
    default:
      break;
  }

  return state;
};

export default reducer;
