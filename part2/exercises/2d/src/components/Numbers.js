import React from "react";

const Numbers = ({ persons, filter }) => {
  const list = persons.filter((person) => {
    return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {list.map((person) => (
          <li key={person.name}>
            {person.name}, {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Numbers;
