document.addEventListener("DOMContentLoaded", () => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const defaultCity = 'Cape Town'; // Default city

  function fetchWeather(city) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      }
    })
    .then(response => {
      const data = response.data;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const temperature = data.main.temp;
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      document.getElementById('weather-details').innerHTML = `
        🌞 ${description.charAt(0).toUpperCase() + description.slice(1)}<br />
        Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>
      `;
      document.getElementById('temperature').textContent = `${temperature}°C`;
      document.getElementById('icon').innerHTML = `<img src="${iconUrl}" alt="${description}">`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
  }

  // Fetch weather for the default city on load
  fetchWeather(defaultCity);

  // Add event listener to the search form
  document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    const searchInput = document.getElementById('search-form-input').value;
    if (searchInput) {
      fetchWeather(searchInput);
    }
  });
});