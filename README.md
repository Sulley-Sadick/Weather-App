# React + Vite

# 🌤️ WeatherDash — Weather Dashboard App

A responsive weather dashboard application built with **React** and **Tailwind CSS**, powered by the OpenWeatherMap API. This capstone project was built as part of the **ALX Frontend Engineering Program**.

---

## 🎯 Project Goal

WeatherDash allows users to search for any city in the world and instantly get real-time weather data including current conditions, temperature, humidity, wind speed, and more — all presented in a clean, intuitive mobile-first interface.

---

## ✨ Features

### Core Features

- 🔍 **City Search** — Search for any city worldwide and retrieve live weather data
- 🌡️ **Current Weather** — View real-time temperature, weather condition, and feels-like temperature
- 📍 **Location Details** — Displays city name, country, and local time
- 💧 **Weather Stats** — Detailed stats including humidity, wind speed, visibility, and atmospheric pressure
- 🌅 **Sunrise & Sunset** — View daily sunrise and sunset times for any city
- 📅 **Weather Forecast** — Multi-day weather forecast with daily high/low temperatures

### UI/UX Features

- ✅ **Success State** — Clear confirmation when weather data is successfully retrieved
- ❌ **Error Handling** — Friendly error message when a city is not found or the request fails
- ⏳ **Loading State** — Visual feedback while weather data is being fetched
- 📱 **Mobile-First Design** — Fully responsive layout optimized for mobile devices
- 🧭 **Bottom Navigation Bar** — Easy navigation between Dashboard, Forecast, Map, and Settings screens

---

## 🛠️ Tech Stack

| Technology         | Purpose                              |
| ------------------ | ------------------------------------ |
| React (Vite)       | Frontend framework                   |
| Tailwind CSS       | Styling and responsive design        |
| OpenWeatherMap API | Live weather data                    |
| React Router       | Client-side navigation between pages |

---

## 📁 Project Structure

```
src/
├── assets/          # Icons and images
├── components/      # Reusable UI components
│   ├── BottomNavBar.jsx
│   ├── SearchBar.jsx
│   └── WeatherCard.jsx
├── pages/           # Full page-level components
│   ├── LandingPage.jsx
│   ├── Dashboard.jsx
│   └── WeatherDetails.jsx
└── services/        # API logic
    └── weatherService.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add your API key

```
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

---

## 🌐 API Reference

This app uses the [OpenWeatherMap API](https://openweathermap.org/api).

- **Current Weather endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **Forecast endpoint:** `https://api.openweathermap.org/data/2.5/forecast`

---

## 📸 Screenshots

> _(Add screenshots of your app here after building)_

---

## 🔮 Future Improvements

- 🗺️ Interactive weather map view
- 📌 Save favourite cities
- 🌙 Dark/Light mode toggle
- 📡 Auto-detect user's current location using Geolocation API
- 🌐 Temperature unit toggle (°C / °F)

---

## 👨‍💻 Author

Built by **[Your Name]** as part of the ALX Frontend Engineering Capstone Project.

- GitHub: [@sulley-sadick](https://github.com/sulley-sadick)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
