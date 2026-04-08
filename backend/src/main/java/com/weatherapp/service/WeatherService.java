package com.weatherapp.service;

import com.weatherapp.dto.ForecastResponse;
import com.weatherapp.dto.OpenWeatherForecastResponse;
import com.weatherapp.dto.OpenWeatherResponse;
import com.weatherapp.dto.WeatherResponse;
import com.weatherapp.exception.CityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    @Value("${openweathermap.api.url}")
    private String apiUrl;

    @Value("${openweathermap.api.key}")
    private String apiKey;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherResponse getWeatherForCity(String city) {
        if ("PLACEHOLDER".equals(apiKey)) {
            // Return mock data if API key is not configured
            return getMockWeatherResponse(city);
        }

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();

        try {
            OpenWeatherResponse response = restTemplate.getForObject(url, OpenWeatherResponse.class);
            return mapToWeatherResponse(response);
        } catch (HttpClientErrorException.NotFound e) {
            throw new CityNotFoundException("City '" + city + "' not found.");
        } catch (Exception e) {
            throw new RuntimeException("Error fetching weather data", e);
        }
    }

    public ForecastResponse getForecastForCity(String city) {
        if ("PLACEHOLDER".equals(apiKey)) {
            throw new RuntimeException("Mock forecast not implemented");
        }

        String forecastUrl = UriComponentsBuilder.fromHttpUrl(apiUrl.replace("/weather", "/forecast"))
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();

        try {
            OpenWeatherForecastResponse response = restTemplate.getForObject(forecastUrl,
                    OpenWeatherForecastResponse.class);
            return mapToForecastResponse(response);
        } catch (HttpClientErrorException.NotFound e) {
            throw new CityNotFoundException("City '" + city + "' not found.");
        } catch (Exception e) {
            throw new RuntimeException("Error fetching forecast data", e);
        }
    }

    private WeatherResponse mapToWeatherResponse(OpenWeatherResponse response) {
        if (response == null || response.weather() == null || response.weather().isEmpty()) {
            throw new RuntimeException("Invalid data received from weather API");
        }

        OpenWeatherResponse.Weather weather = response.weather().get(0);

        return new WeatherResponse(
                response.name(),
                response.main().temp(),
                weather.main(),
                response.main().humidity(),
                response.wind().speed(),
                weather.icon(),
                response.main().feelsLike());
    }

    private ForecastResponse mapToForecastResponse(OpenWeatherForecastResponse response) {
        if (response == null || response.list() == null || response.list().isEmpty()) {
            throw new RuntimeException("Invalid forecast data received");
        }

        // Group the 3-hour blocks by their date string (e.g., "2026-03-10")
        Map<String, List<ForecastResponse.HourlyForecast>> groupedByDate = new LinkedHashMap<>();

        // We also need to determine the "main" daily temperature and condition for the
        // primary card.
        // We'll calculate the average daily temp and use the most frequent
        // condition/icon, or simply
        // the condition at noon for brevity. For simplicity here, we'll store the noon
        // values or the first seen.
        Map<String, ForecastResponse.DailyForecast> dailyMainData = new LinkedHashMap<>();

        for (OpenWeatherForecastResponse.ForecastItem item : response.list()) {
            String fullDtTxt = item.dt_txt(); // "2026-03-10 18:00:00"
            String date = fullDtTxt.substring(0, 10);
            String time = fullDtTxt.substring(11, 16); // "18:00"

            ForecastResponse.HourlyForecast hourly = new ForecastResponse.HourlyForecast(
                    time,
                    item.main().temp(),
                    item.weather().get(0).main(),
                    item.weather().get(0).icon());

            groupedByDate.computeIfAbsent(date, k -> new ArrayList<>()).add(hourly);

            // If we haven't set the main daily card info, or if this block is 12:00:00, use
            // it as the representative day data
            if (!dailyMainData.containsKey(date) || time.equals("12:00")) {
                dailyMainData.put(date, new ForecastResponse.DailyForecast(
                        date,
                        item.main().temp(),
                        item.weather().get(0).main(),
                        item.weather().get(0).icon(),
                        null // we'll set this later
                ));
            }
        }

        List<ForecastResponse.DailyForecast> dailyForecasts = new ArrayList<>();
        int daysCount = 0;

        for (Map.Entry<String, List<ForecastResponse.HourlyForecast>> entry : groupedByDate.entrySet()) {
            if (daysCount >= 5)
                break;

            String date = entry.getKey();
            List<ForecastResponse.HourlyForecast> hourlyData = entry.getValue();
            ForecastResponse.DailyForecast mainData = dailyMainData.get(date);

            dailyForecasts.add(new ForecastResponse.DailyForecast(
                    date,
                    mainData.temp(),
                    mainData.condition(),
                    mainData.icon(),
                    hourlyData));
            daysCount++;
        }

        return new ForecastResponse(response.city().name(), dailyForecasts);
    }

    private WeatherResponse getMockWeatherResponse(String city) {
        if (city.equalsIgnoreCase("Unknown")) {
            throw new CityNotFoundException("City '" + city + "' not found.");
        }

        // Generate pseudo-random deterministic data based on the city name hash
        int hash = Math.abs(city.hashCode());
        double temp = 10.0 + (hash % 25); // Varies between 10 and 34
        double feelsLike = temp + (hash % 5 - 2);
        int humidity = 30 + (hash % 60);
        double windSpeed = 1.0 + (hash % 10);

        String[] conditions = { "Clear", "Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle" };
        String[] icons = { "01d", "02d", "09d", "13d", "11d", "10d" };

        int conditionIndex = hash % conditions.length;
        String condition = conditions[conditionIndex];
        String icon = icons[conditionIndex];

        return new WeatherResponse(
                city,
                temp,
                condition,
                humidity,
                windSpeed,
                icon,
                feelsLike);
    }
}
