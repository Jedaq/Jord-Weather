const weatherIcons = {
  'clear sky': 'fas fa-sun', 
  'few clouds': 'fas fa-cloud-sun', 
  'scattered clouds': 'fas fa-cloud-meatball',
  'broken clouds': 'fas fa-smog', 
  'overcast clouds': 'fas fa-cloud', 
  'shower rain': 'fas fa-cloud-showers-heavy', 
  'moderate rain' :'fas fa-cloud-showers-heavy',
  'rain': 'fas fa-cloud-rain', 
  'drizzle':'fas fa-cloud-rain',
  'thunderstorm': 'fas fa-bolt', 
  'snow': 'fas fa-snowflake', 
  'mist': 'fas fa-smog',
  'heavy intensity rain': 'fas fa-cloud-showers-heavy',
  'light rain': 'fas fa-cloud-rain',
  'light intensity drizzle': 'fas fa-water',
  'thunderstorm with light rain' :'fas fa-bolt',
  'smoke':'fas fa-cloud',
  'haze':'fas fa-sun',
  'snow':'fas fa-snowflake',
  'light snow':'fas fa-snowflake',
  'blizzard':'fas fa-snowflake'
};

async function getWeather() {
  const apiKey = '4ad0190c36da4faad93e2a2ab914ae3f';
  const cityNameInput = document.getElementById('cityNameInput').value;

  try {
    const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=${apiKey}`);
    const currentData = await currentResponse.json();

    console.log('Current Weather Data:', currentData);
    
    const geolocationResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=${apiKey}`);
    const geolocationData = await geolocationResponse.json();

    console.log('Geolocation:',geolocationData);

    if (!currentData || !currentData.main || !currentData.main.temp || !currentData.wind || !currentData.wind.speed || !currentData.main.humidity) {
      console.error('Invalid weather data received:', currentData);
      throw new Error('Invalid weather data received');
    }
    document.getElementById('cityNameInput').value = '';

    const temperatureCelsius = (currentData.main.temp - 273.15).toFixed(2);
    const windSpeed = currentData.wind.speed;
    const humidity = currentData.main.humidity;
    const weatherDescription = currentData.weather[0].description;
    const pressure = currentData.main.pressure;
    const sunriseTimestamp = currentData.sys.sunrise;
    const sunsetTimestamp = currentData.sys.sunset ;




    const temperatureInfo = document.getElementById('temperature');
    const windSpeedInfo = document.getElementById('wind-speed');
    const humidityInfo = document.getElementById('humidity');
    const weatherDescriptionInfo = document.getElementById('weather-description');
    weatherDescriptionInfo.innerHTML = `Weather: ${weatherDescription}`;
    const pressureInfo = document.getElementById('pressure');
    const sunriseInfo = document.getElementById('sunrise');
    const sunsetInfo = document.getElementById('sunset');

    document.getElementById('city-name').textContent = cityNameInput;

    temperatureInfo.innerHTML = `Temperature: ${temperatureCelsius}°C`;
    windSpeedInfo.innerHTML = `Wind Speed: ${windSpeed} m/s`;
    humidityInfo.innerHTML = `Humidity: ${humidity}%`;
    weatherDescriptionInfo.innerHTML = `${weatherDescription}`;
    pressureInfo.innerHTML = `Pressure: ${pressure} hPa`;

    
    const sunriseTimeUTC = new Date(sunriseTimestamp * 1000).toUTCString();
    const sunsetTimeUTC = new Date(sunsetTimestamp * 1000).toUTCString();
    sunriseInfo.innerHTML = `Sunrise (UTC): ${sunriseTimeUTC}`;
    sunsetInfo.innerHTML = `Sunset (UTC): ${sunsetTimeUTC}`;
    const iconClass = weatherIcons[weatherDescription];

    const iconElement = document.getElementById('weather-icon');
    iconElement.className = `fas ${iconClass}`;


    const weatherInfoContainer = document.querySelector('.current-weather');
    fadeIn(weatherInfoContainer);

    const forecontainer = document.querySelector('.weather-widget');
    fadeIn(forecontainer);

    const geolocat = document.querySelector('.geolocation-container');
    fadeIn(geolocat);
    
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();

    console.log('Forecast Data:', forecastData);

    if (!forecastData || !forecastData.list) {
      console.error('Invalid forecast data received:', forecastData);
      return;
    }
    const forecastHeading = document.getElementById('forecast-heading');
    forecastHeading.style.display = 'block';
    
    const foreContainer = document.getElementById('forecastContainer');
    foreContainer.style.display = 'flex';

    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';

    const errorContainer = document.getElementById('error-message');
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
    
    const Dayscount = 40;

    for (let i = 0; i < Dayscount; i++) {
      const forecast = forecastData.list[i];
      const forecastDateTime = new Date(forecast.dt * 1000);
      const forecastDate = forecastDateTime.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      const forecastTime = forecastDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const forecastTemp = (forecast.main.temp - 273.15).toFixed(2);
      const forecastDescription = forecast.weather[0].description;

      const iconClass = weatherIcons[forecastDescription];

      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-card');
      forecastCard.innerHTML = `
        <p>${forecastDate}, ${forecastTime}</p>
        <p>Temperature: ${forecastTemp}°C</p>
        <i class="fas ${iconClass}"></i>
        <p>${forecastDescription}</p>`;
      forecastContainer.appendChild(forecastCard);
    }

    if (geolocationData && geolocationData.name && geolocationData.sys) {
      const city = geolocationData.name;
      const state = geolocationData.sys.country;
      const latitude = geolocationData.coord.lat;
      const longitude = geolocationData.coord.lon;

      document.getElementById('geolocationContainer').style.display = 'block';
      document.getElementById('cityInfo').textContent = city;
      document.getElementById('stateInfo').textContent = state;
      document.getElementById('latitudeInfo').textContent = latitude;
      document.getElementById('longitudeInfo').textContent = longitude;
    }

  } catch (error) {
    console.error('Error:', error);
    const errorContainer = document.getElementById('error-message');
    errorContainer.innerHTML = '<i class="fas fa-exclamation-circle"></i> City not found, enter an existing city.';
    errorContainer.style.display = 'block';
  }
}

function fadeIn(element) {
  element.style.opacity = 0;
  element.style.display = 'block';

  let opacity = 0;
  const duration = 800;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    opacity = (elapsedTime / duration);

    if (opacity <= 1) {
      element.style.opacity = opacity;
      requestAnimationFrame(animate);
    } else {
      element.style.opacity = 1;
    }
  }

  requestAnimationFrame(animate);
}
