import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Weather } from './weather';
import WeatherInfo from './weather-info';

// 1. Introduce a type guard to get rid of the type assertion.
const has = (value: any): value is boolean => Boolean(value);

// 2. Move constants out of the component, there is no need to redefine them on every render.
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const suffix = '&units=imperial&appid=d6c1dad3b2dd811ec34e5142a466f21b';

const App: React.FC = () => {
  const [city, setCity] = useState('London');

  // 3. Explicitly provide a default value for each state.
  const [weather, setWeather] = useState<Weather | null>(null);

  // 4. Dan Abramov explains it his looong article - https://overreacted.io/a-complete-guide-to-useeffect/
  //    but long story short - we must always specify all the component scope variables that useEffect
  //    references within the callback. There are a couple ways to refactor the code if the default behavior
  //    doesn't work for an app.
  useEffect(() => {
    getWeather(city);
  }, []);

  // 5. I don't like the fact that "city" param shadows the local state variable "city", renamed it to "location".
  // async function getWeather(city: string) {
  async function getWeather(location: string) {
    const response = await fetch(baseUrl + location + suffix);
    const jsonWeather = await response.json();
    const tempHumidity: Weather = jsonWeather.main;
    setWeather(tempHumidity);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
    console.log(weather);
  };

  return (
    <>
      {/* In a real app I wouldn't pass each weather property as a separate prop. */}
      {has(weather) ? (
        <WeatherInfo
          temp={weather.temp}
          temp_min={weather.temp_min}
          temp_max={weather.temp_max}
          humidity={weather.humidity}
          pressure={weather.pressure}
        />
      ) : (
        <h2>No weather available</h2>
      )}
    </>
  );

  /*   return (
    <div>
      <form onSubmit = {handleSubmit}>
        <input type="text" placeholder="Enter city"
               onInput = {handleChange} />
        <button type="submit">Get Weather</button>
        <h2>City: {city}</h2>
        {weather &&  <h2>Temperature: {weather.temp}F</h2>}
      </form>
    </div>
  ); */
};

export default App;
