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

export default { getAll };
