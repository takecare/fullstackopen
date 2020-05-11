import React from "react";
import Country from "./Country";
import CountriesList from "./CountriesList";

const Countries = ({ countries, onCountrySelected }) => {
  let component;

  // const handleSelectedCountry = (country) => {
  //   component = <Country country={country} />;
  // };

  if (countries.length > 10) {
    component = <p>Too many matches</p>;
  } else if (countries.length === 1) {
    component = <Country country={countries[0]} />;
  } else {
    component = (
      <CountriesList
        countries={countries}
        onCountrySelected={onCountrySelected}
      />
    );
  }

  return component;
};

export default Countries;
