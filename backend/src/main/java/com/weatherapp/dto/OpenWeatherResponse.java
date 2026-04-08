package com.weatherapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record OpenWeatherResponse(
        String name,
        MainData main,
        List<Weather> weather,
        Wind wind) {
    public record MainData(
            double temp,
            @JsonProperty("feels_like") double feelsLike,
            int humidity) {
    }

    public record Weather(
            String main,
            String description,
            String icon) {
    }

    public record Wind(
            double speed) {
    }
}
