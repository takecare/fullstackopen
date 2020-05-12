import React, { useState, useEffect } from "react";
import numbers from "./services/numbers";
import FilterInput from "./components/FilterInput";
import NewNumberForm from "./components/NewNumberForm";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const getNumbersHook = () => {
    numbers.read().then((data) => setPersons(data));
  };
  useEffect(getNumbersHook, []);

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value);
  };

  const replace = (person) => {
    numbers
      .update({ ...person, number: newNumber })
      .then((data) => {
        setPersons(
          persons.map((item) => (item.id === person.id ? data : item))
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.error(error));
  };

  const addNumber = () => {
    const person = persons.find((person) => person.name === newName);

    if (person) {
      const shouldRepalce = window.confirm(
        `${newName} is already on the phonebook. Replace with a new one?`
      );
      if (shouldRepalce) {
        replace(person);
      }
    } else {
      const number = { name: newName, number: newNumber };
      numbers
        .create(number)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      `Delete ${persons.find((person) => person.id === id).name}?`
    );
    if (shouldDelete) {
      numbers
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewNumberForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameInputChange}
        handleNumberChange={handleNumberInputChange}
        addNumber={addNumber}
      />
      <Numbers persons={persons} filter={newFilter} onDelete={handleDelete} />
      <FilterInput filter={newFilter} handleChange={handleFilterInputChange} />
    </div>
  );
};

export default App;
