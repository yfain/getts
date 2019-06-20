import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Weather } from './weather';
import WeatherInfo from './weather-info';

const has = (value: any): value is boolean => !!value;

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const suffix = '&units=imperial&appid=d6c1dad3b2dd811ec34e5142a466f21b';

const App: React.FC = () => {
  const [city, setCity] = useState('London');
  const [msgFromChild, setMsgFromChild] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    getWeather(city);
  }, []);

  async function getWeather(location: string) {
    const response = await fetch(baseUrl + location + suffix);
    if (response.status === 200){
      const jsonWeather = await response.json();
      const cityTemp: Weather = jsonWeather.main;
      cityTemp.city=jsonWeather.name;
      setWeather(cityTemp);
    } else {
        setWeather(null);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getWeather(city);
    console.log(weather);
  };

  const getMsgFromChild = (msg: string) => setMsgFromChild(msg);

  return (
    <>
      <form onSubmit = {handleSubmit}>
        <input type="text" placeholder="Enter city"
               onInput = {handleChange} />
        <button type="submit">Get Weather</button>
      </form>
      {msgFromChild}
      {has(weather) ? (
        <WeatherInfo weather = {weather} parentChannel = {getMsgFromChild}>
         <strong>Hello from the parent!</strong>
         </WeatherInfo> 
      ) : (
        <h2>No weather available</h2>
      )}
    </>
  );
};

export default App;