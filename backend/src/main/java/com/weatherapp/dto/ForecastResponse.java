package com.weatherapp.dto;

import java.util.List;

public record ForecastResponse(
                String cityName,
                List<DailyForecast> dailyForecasts) {
        public record DailyForecast(
                        String date,
                        double temp,
                        String condition,
                        String icon,
                        List<HourlyForecast> hourlyData) {
        }

        public record HourlyForecast(
                        String time,
                        double temp,
                        String condition,
                        String icon) {
        }
}
