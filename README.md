# WeatherNow Application

A beautiful, modern full-stack weather application built with Spring Boot and React. It features a stunning glassmorphism UI, real-time weather data from OpenWeatherMap, and hyper-realistic 3D flying bird animations powered by Vanta.js and Three.js.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Java 17** (or higher)
- **Maven**
- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)

## Project Structure
This repository contains two main directories:
- `/backend`: The Java Spring Boot application (REST API).
- `/frontend`: The React.js frontend application (Vite).

## Getting Started

### 1. Setting up the Backend (Spring Boot)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. The application is pre-configured with a working OpenWeatherMap API key. If you want to use your own, update the `application.properties` file:
   File path: `src/main/resources/application.properties`
   ```properties
   openweathermap.api.key=YOUR_API_KEY
   ```
3. Run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   *The backend server will start on `http://localhost:8080`.*

### 2. Setting up the Frontend (React)
1. Open a **new** separate terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend application will start on `http://localhost:5173`.*

## Usage
Once both servers are running, open your web browser and navigate to:
**`http://localhost:5173`**

Type in any city name (e.g., "London", "Tokyo", "Paris") into the search bar and press Enter or the search icon to see the live weather data and dynamic background animations!

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Vanta.js, Three.js, Axios, React Icons
- **Backend**: Java, Spring Boot, Spring Web
- **External API**: OpenWeatherMap API
