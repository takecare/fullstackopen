import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryLanguages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>
  );
};

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>
        Capital: {country.capital}
        <br />
        Population: {country.population}
      </div>
      <h3>Languages</h3>
      <CountryLanguages languages={country.languages} />
      <img src={country.flag} width="256px" />
    </>
  );
};

const CountriesList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
};

const Countries = ({ countries }) => {
  let component;

  if (countries.length > 10) {
    component = <p>Too many matches</p>;
  } else if (countries.length === 1) {
    component = <Country country={countries[0]} />;
  } else {
    component = <CountriesList countries={countries} />;
  }

  return component;
};

const SearchResults = ({ results }) => {
  let component;

  if (results.error) {
    component = <p>Error</p>;
  } else {
    component = <Countries countries={results.countries} />;
  }

  return component;
};

const CountrySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ countries: [], error: null });

  const queryApi = (query) => {
    if (!query) {
      setResults({ countries: [], error: null });
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${query}`)
        .then((response) =>
          setResults({ countries: response.data, error: null })
        )
        .catch((error) => setResults({ countries: [], error: error }));
    }
  };
  useEffect(queryApi, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    queryApi(event.target.value);
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">find countries: </label>
          <input
            defaultValue={query}
            type="text"
            name="name"
            id="name"
            onChange={handleQueryChange}
          />
        </div>
      </form>
      <SearchResults results={results} />
    </>
  );
};

const App = () => {
  return (
    <div>
      <CountrySearch />
    </div>
  );
};

export default App;
