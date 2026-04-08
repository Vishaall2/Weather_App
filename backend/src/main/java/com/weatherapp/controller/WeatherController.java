package com.weatherapp.controller;

import com.weatherapp.dto.ForecastResponse;
import com.weatherapp.dto.WeatherResponse;
import com.weatherapp.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public ResponseEntity<WeatherResponse> getWeather(@RequestParam("city") String city) {
        WeatherResponse response = weatherService.getWeatherForCity(city);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/forecast")
    public ResponseEntity<ForecastResponse> getForecast(@RequestParam("city") String city) {
        ForecastResponse response = weatherService.getForecastForCity(city);
        return ResponseEntity.ok(response);
    }
}
