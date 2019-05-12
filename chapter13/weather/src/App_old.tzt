import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Weather } from "./weather";
import WeatherInfo from "./weather-info";

const App: React.FC = () => {

  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<Weather>();

  const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  const suffix = "&units=imperial&appid=d6c1dad3b2dd811ec34e5142a466f21b";

  useEffect( () => { getWeather(city) }, []);  

  const getWeather = async (city: string) => {
      const response = await fetch(baseUrl + city + suffix);
      const jsonWeather = await response.json();
      const tempHumidity: Weather = jsonWeather.main;
      setWeather(tempHumidity);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity( event.target.value );
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
    console.log(weather);
  }

  return (
    <WeatherInfo temp = {weather!.temp} temp_min = {weather!.temp_min}
                 temp_max = {weather!.temp_max} humidity = {weather!.humidity}
                 pressure = {weather!.pressure} />
  );

/*   return (
    <div>
      <form onSubmit = {handleSubmit}>
        <input type="text" placeholder="Enter city"
               onInput = {handleChange} />
        <button type="submit">Get Weather</button>
        <h2>City: {city}</h2>
        {weather &&  <h2>Temerature: {weather.temp}F</h2>}
      </form>
    </div>
  ); */
}

export default App;
