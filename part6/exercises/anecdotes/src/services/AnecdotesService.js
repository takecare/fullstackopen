const endpoint = "http://localhost:3001/notes";

const getAll = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }

  return response.json();
};

const addAnecdote = async (content) => {
  const anecdote = { content, votes: 0, important: false };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anecdote),
  };
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    const body = await response.json();
    throw Error(`${response.status} ${body.error}`);
  }

  return response.json();
};

export default {
  getAll,
  addAnecdote,
};
