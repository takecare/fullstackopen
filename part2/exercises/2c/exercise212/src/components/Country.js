import React from "react";
import CountryLanguages from "./CountryLanguages";

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
      <img src={country.flag} width="256px" alt={`${country.name}'s flag`} />
    </>
  );
};

export default Country;
