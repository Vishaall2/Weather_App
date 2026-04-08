import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import BackgroundAnimation from './components/BackgroundAnimation';
import ForecastCard from './components/ForecastCard';
import { fetchWeather, fetchForecast } from './services/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgClass, setBgClass] = useState('bg-sunny');

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');

    try {
      const [currentWeather, forecast] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeatherData(currentWeather);
      setForecastData(forecast);
      updateBackground(currentWeather.condition);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = (condition) => {
    if (!condition) return;
    const mainCondition = condition.toLowerCase();
    if (mainCondition.includes('rain') || mainCondition.includes('drizzle') || mainCondition.includes('thunderstorm')) {
      setBgClass('bg-rainy');
    } else if (mainCondition.includes('cloud')) {
      setBgClass('bg-cloudy');
    } else if (mainCondition.includes('clear')) {
      setBgClass('bg-sunny');
    } else if (mainCondition.includes('snow')) {
      setBgClass('bg-cloudy'); // simple fallback
    } else {
      setBgClass('bg-sunny');
    }
  };

  return (
    <div className={`min-h-screen ${bgClass} bg-animate flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out relative overflow-x-hidden overflow-y-auto custom-scrollbar`}>
      <BackgroundAnimation condition={weatherData?.condition} />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="w-full max-w-4xl mx-auto relative z-10"
      >
        <div className="text-center mb-10">
          <motion.h1
            initial={{ scale: 0.8, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="text-6xl font-extrabold text-white text-shadow tracking-tight mb-3 drop-shadow-xl"
          >
            Weather<span className="text-white/70 font-light">Now</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-white/90 font-medium tracking-wide"
          >
            Beautiful weather, anytime.
          </motion.p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loader" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                <Loader />
              </motion.div>
            )}

            {error && !loading && (
              <motion.div key="error" exit={{ opacity: 0, y: -20 }}>
                <ErrorMessage message={error} />
              </motion.div>
            )}

            {weatherData && !loading && !error && (
              <motion.div key="card" exit={{ opacity: 0, y: 20, scale: 0.95 }} className="w-full">
                <WeatherCard data={weatherData} />
                {forecastData && <ForecastCard forecastData={forecastData} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
