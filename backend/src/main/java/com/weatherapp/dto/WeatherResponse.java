package com.weatherapp.dto;

public record WeatherResponse(
        String cityName,
        double temperature,
        String condition,
        int humidity,
        double windSpeed,
        String icon,
        double feelsLike) {
}
