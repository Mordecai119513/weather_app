document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    fetchWeatherData(city);
  }
});

async function fetchWeatherData(city) {
  const apiKey = "90d0b866c517a28536177b28dbd5a96a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching the weather data", error);
  }
}

function displayWeatherData(data) {
  if (data.cod === 200) {
    document.getElementById("dew-point").textContent = `${data.main.temp} °C`;
    document.getElementById(
      "heat-index"
    ).textContent = `${data.main.feels_like} °C`;
    document.getElementById(
      "wind-chill"
    ).textContent = `${data.wind.speed} m/s`;
    document.getElementById("wet-bulb").textContent = `${data.main.humidity} %`;
    document.getElementById("visibility").textContent = `${data.visibility} m`;
  } else {
    document.getElementById("weather-info").innerHTML =
      "<p>City not found. Please try again.</p>";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("savedCity");
  if (savedCity) {
    fetchWeatherData(savedCity);
    document.getElementById("city-input").value = savedCity;
  }
});

document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    localStorage.setItem("savedCity", city);
    fetchWeatherData(city);
  }
});
