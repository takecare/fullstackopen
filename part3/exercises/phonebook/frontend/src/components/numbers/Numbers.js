import React from "react";
import "./numbers.css";

const Numbers = ({ persons, filter, onDelete }) => {
  const list = persons.filter((person) => {
    return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });

  return (
    <div className="numbers">
      <ul>
        {list.map((person) => (
          <li key={person.name}>
            {person.name}, {person.number}
            <button onClick={() => onDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
