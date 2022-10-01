import React, { useState } from 'react';
import './App.css';

const api = {
  api: '13bc56d7aa1e7372488090dc56f2a2c2',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.api}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
        })
    }
  }

  console.log(weather);

  // const dateBuilder = (d) => {
  //   let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  //   let days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

  //   let [day, month, date, year, time] = [days[d.getDay()], months[d.getMonth()], d.getDate(), d.getFullYear(), d.getHours() + ":" + d.getMinutes()]
  //   return `${day} ${date} ${month} ${year} - ${time}`
  // }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? (weather.main.temp > 20) ? "app warm" : "app" 
        : "app"
    }>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Buscar ciudad...'
            autoFocus
            onChange={evt => setQuery(evt.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined'
          ? (
            <div>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                {/* <div className='date'>{dateBuilder(new Date())}</div> */}
              </div>
              <div className='weather-box'>
                <div className='temp'>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className='weather'>{weather.weather[0].main}</div>
                <div className='extra-info'>
                  <div>
                    Velocidad del viento: {weather.wind.speed}
                  </div>
                  <div>
                    Latitud: {weather.coord.lon}, Longitud: {weather.coord.lat}
                  </div>
                  <div>
                    Humedad: {weather.main.humidity}
                  </div>
                </div>
              </div>
            </div>
          )
          : ('')}
      </main>
    </div>
  );
}

export default App;
