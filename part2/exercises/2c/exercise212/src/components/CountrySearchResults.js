import React from "react";
import Countries from "./Countries";

const CountrySearchResults = ({ results, onCountrySelected }) => {
  let component;

  if (results.error) {
    component = <p>Error</p>;
  } else {
    component = (
      <Countries
        countries={results.countries}
        onCountrySelected={onCountrySelected}
      />
    );
  }

  return component;
};

export default CountrySearchResults;
