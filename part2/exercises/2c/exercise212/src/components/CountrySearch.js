import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchField from "./SearchField";
import CountrySearchResults from "./CountrySearchResults";

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

  const handleSelectedCountry = (country) => {
    setResults({ countries: [country], error: null });
    setQuery(country.name);
  };

  return (
    <>
      <SearchField query={query} onChange={handleQueryChange} />
      <CountrySearchResults
        results={results}
        onCountrySelected={handleSelectedCountry}
      />
    </>
  );
};

export default CountrySearch;
