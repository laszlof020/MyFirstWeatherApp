import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('London'); // Alapértelmezett város
    const [searchCity, setSearchCity] = useState(''); // Keresési város

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0e5eb3e3bdbd98d9470be8a011dd66b`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    const handleSearch = () => {
        setCity(searchCity); // Város frissítése a keresési értékkel
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="weather-container">
            <div className="search-box">
                <input
                    type="text"
                    className="search-input" id='search-bar'
                    placeholder="Search city..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h1 className="location">Weather in {weatherData.name}</h1>
                    <p className="temperature">{Math.round(weatherData.main.temp - 273.15)}°C</p>
                    <p className="description">Weather: {weatherData.weather[0].description}</p>
                    <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
                    <p className="wind-speed">Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;