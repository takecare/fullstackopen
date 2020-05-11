import React from "react";

const CountriesListItem = ({ country, onCountrySelected }) => {
  return (
    <li>
      {country.name}
      <button onClick={() => onCountrySelected(country)}>show</button>
    </li>
  );
};

const CountriesList = ({ countries, onCountrySelected }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountriesListItem
          key={country.name}
          country={country}
          onCountrySelected={onCountrySelected}
        />
      ))}
    </ul>
  );
};

export default CountriesList;
