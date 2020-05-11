import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({
    temperature: 0,
    description: "",
    wind: "",
    icon: "",
  });

  const getWeatherDataHook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_STACK_API_KEY}&query=${city}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather({
          temperature: response.data.current.temperature,
          description: response.data.current.weather_descriptions[0],
          wind: `${response.data.current.wind_speed}mph ${response.data.current.wind_dir}`,
          icon: response.data.current.weather_icons[0],
        });
      })
      .catch((error) => console.error(error));
  };
  useEffect(getWeatherDataHook, []);

  return (
    <>
      <h3>Weather in {city}</h3>
      <p>
        <b>temperature:</b> {weather.temperature} c
      </p>
      <img
        src={weather.icon}
        width="64px"
        alt={`It's ${weather.description}`}
      />
      <p>
        <b>wind:</b> {weather.wind}
      </p>
    </>
  );
};

export default Weather;
