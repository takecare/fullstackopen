import anecdotesService from "../services/AnecdotesService";

const generateId = () => (100000 * Math.random()).toFixed(0);

// state is an array of anectode objects

export const loadAction = () => async (dispatch) => {
  const anecdotes = await anecdotesService.getAll();
  dispatch(createLoadAction(anecdotes));
};
const createLoadAction = (anecdotes) => ({
  type: "LOAD",
  data: { anecdotes },
});

export const voteAction = (anecdote) => async (dispatch) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 };
  const r = await anecdotesService.updateAnecdote(updated);
  dispatch(createVoteAction(anecdote));
};
const createVoteAction = (anecdote) => ({ type: "VOTE", data: anecdote });

export const createAnecdoteAction = (content) => async (dispatch) => {
  const addedAnecdote = await anecdotesService.addAnecdote(content);
  dispatch(createCreateAnecdoteAction(addedAnecdote.content));
};
const createCreateAnecdoteAction = (content) => {
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
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id === id
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
