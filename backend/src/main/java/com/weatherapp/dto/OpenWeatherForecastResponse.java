package com.weatherapp.dto;

import java.util.List;

public record OpenWeatherForecastResponse(
        List<ForecastItem> list,
        City city) {
    public record ForecastItem(
            long dt,
            Main main,
            List<Weather> weather,
            String dt_txt) {
    }

    public record Main(
            double temp,
            double feels_like,
            int humidity) {
    }

    public record Weather(
            int id,
            String main,
            String description,
            String icon) {
    }

    public record City(
            String name,
            String country) {
    }
}
