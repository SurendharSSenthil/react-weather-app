import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot,faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5/';
const REACT_APP_API_KEY = 'a82a129e921c620cb24e5dbb68b7c603';

function App() {
  const [search, setSearch] = useState('Coimbatore');
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [windspeed, setWindSpeed] = useState(0);
  const [sunrise, setSunRise] = useState('');
  const [sunset, setSunSet] = useState('');
  const [pre, setPre] = useState(0);
  const [hum, setHum] = useState(0);
  const [Weather, setWeather] = useState(null);

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      fetch(`${REACT_APP_API_URL}weather?q=${search}&appid=${REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setWeather(data.weather[0].main);
          setTemp(data.main.temp.toFixed(1));
          setDesc(data.weather[0].main);
          setWindSpeed(data.wind.speed);
          setSunRise(convertEpochToTime(data.sys.sunrise));
          setSunSet(convertEpochToTime(data.sys.sunset));
          setPre(data.main.pressure);
          setHum(data.main.humidity);
        })
        .catch(err => {
          console.log(err);
          setTemp("City Not Found");
        });
    }
  };

  function convertEpochToTime(epoch) {
    return new Date(epoch * 1000).toLocaleTimeString();
  }

  useEffect(() => {
    handleSubmit({ key: 'Enter' });
  }, [handleSubmit]);

  return (
    <div className="app app-warm">
      <h1>Weather App</h1>
      <div className='Body'>
        <nav>
          <input value={search} type='text' onChange={(e) => setSearch(e.target.value)} onKeyPress={handleSubmit} placeholder='enter the place' />
        </nav>
        <div className='general'>
        <div className='sunData'>
        <FontAwesomeIcon icon={faSun} spin size="2xl" style={{color: "#faaf41",}} className='sun' />
        {sunrise && <div className='sunrise'>Sunrise: {sunrise}</div>}
        {sunset && <div className='sunset'>Sunset: {sunset}</div>}
        </div>
        <div className='gen-Data'>
        <div className='data desc'>Description : {desc}</div>
        <div className='data pre'>Pressure : {pre} hPa</div>
        <div className='data hum'>Humidity : {hum} %</div>
          <div className='data windSpeed'>Wind Speed : {windspeed}</div>
        </div>
        </div>
        <div className='info-container'>
          <div className='place'>
        <FontAwesomeIcon icon={faLocationDot} size='2xl' style={{color: "#74C0FC",}} />
          <div className='city-info'>{search}</div>
          </div>
          <div className='temp'>
          <FontAwesomeIcon icon={faTemperatureHalf} size='2xl' style={{color: "#74C0FC",}} />
          <div className='Temp'>{`${temp} C`}</div>
          </div>
        </div>
      </div>
      <div className='footer'>&copy;Surendhar Senthil</div>
    </div>
  );
}

export default App;
