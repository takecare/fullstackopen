import React, { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/filter/Filter";
import NumberForm from "./components/numberform/NumberForm";
import Numbers from "./components/numbers/Numbers";
import Notification from "./components/notification/Notification";

const App = () => {
  const MESSAGE_TIMEOUT_MS = 3000;

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setNewMessage] = useState({ text: "", isError: false });
  const [storedTimeout, storeTimeout] = useState(null);

  const getPersonsHook = () => {
    personsService
      .read()
      .then((data) => setPersons(data))
      .catch((error) => {
        setNewMessage({ text: "Failed to load data.", isError: true });
        console.error(error);
      });
  };
  useEffect(getPersonsHook, []);

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value);
  };

  const updatePerson = (updatedPerson) => {
    personsService
      .update({ ...updatedPerson, number: newNumber })
      .then((data) => {
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? data : person
          )
        );
        displayMessage(`${updatedPerson.name}'s number replaced.`);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        displayError(`Failed to replace ${updatedPerson.name}'s number.`);
        console.error(error);
      });
  };

  const displayMessage = (message) => {
    clearTimeout(storedTimeout);
    setNewMessage({ text: message, isError: false });
    const timeout = setTimeout(() => {
      storeTimeout(null);
      setNewMessage({ ...message, text: null });
    }, MESSAGE_TIMEOUT_MS);
    storeTimeout(timeout);
  };

  const displayError = (message) => {
    clearTimeout(storedTimeout);
    setNewMessage({ text: message, isError: true });
    const timeout = setTimeout(() => {
      storeTimeout(null);
      setNewMessage({ ...message, text: null });
    }, MESSAGE_TIMEOUT_MS);
    storeTimeout(timeout);
  };

  const addNumber = () => {
    const person = persons.find((person) => person.name === newName);

    if (person) {
      const shouldRepalce = window.confirm(
        `${newName} is already on the phonebook. Replace with a new one?`
      );
      if (shouldRepalce) {
        updatePerson(person);
      }
    } else {
      const number = { name: newName, number: newNumber };
      personsService
        .create(number)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          displayError("Failed to add new number.");
          console.error(error);
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const shouldDelete = window.confirm(`Delete ${person.name}?`);
    if (shouldDelete) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          displayMessage(`${person.name} removed.`);
        })
        .catch((error) => {
          displayError(`Failed to remove ${person.name}.`);
          console.error(error);
        });
    }
  };

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Notification message={message} />
      <h3>Add new</h3>
      <NumberForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameInputChange}
        handleNumberChange={handleNumberInputChange}
        addNumber={addNumber}
      />
      <h3>Numbers</h3>
      <Filter filter={newFilter} handleChange={handleFilterInputChange} />
      <Numbers persons={persons} filter={newFilter} onDelete={handleDelete} />
    </div>
  );
};

export default App;
