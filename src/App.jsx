import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const apiKey = '8d44b506e52042649b6180107242008';  // Substitua pela sua chave da WeatherAPI
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`);

      if (!response.ok) {
        throw new Error('Cidade não encontrada');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="app-container">
      <h1>Previsão do Tempo</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}</h2>
          <p>Temperatura: {weatherData.current.temp_c}°C</p>
          <p>Condições: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
        </div>
      )}
    </div>
  );
}

export default App;
