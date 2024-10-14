const cityElement = document.getElementById("city");

const displayCity = (city) => {
  if (cityElement) {
    cityElement.value = city;
  } else {
    console.log(`Ваш город: ${city}`);
  }
};

const getCityName = (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const city =
        data.address.city || data.address.town || data.address.village;
      if (city) {
        saveCityToLocalStorage(city);
        displayCity(city);
      } else {
        setDefaultCity();
      }
    })
    .catch(() => {
      setDefaultCity();
    });
};

const getWeather = (latitude, longitude) => {
  const url = `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentData = data.dataseries[0];
      const temp = currentData.temp2m;
      const weatherCode = currentData.weather;
      console.log(weatherCode);

      document.getElementById(
        "temperature"
      ).textContent = `Температура: ${temp}°C`;

      const conditions = {
        clearday: { text: "Ясно", icon: "wi-day-sunny" },
        clearnight: { text: "Ясно", icon: "wi-day-sunny" },
        pcloudyday: { text: "Малооблачно", icon: "wi-day-cloudy" },
        pcloudynight: { text: "Малооблачно", icon: "wi-day-cloudy" },
        cloudyday: { text: "Облачно", icon: "wi-cloudy" },
        cloudynight: { text: "Облачно", icon: "wi-cloudy" },
        mcloudyday: { text: "Пасмурно", icon: "wi-cloudy-windy" },
        mcloudynight: { text: "Пасмурно", icon: "wi-cloudy-windy" },
        lightrain: { text: "Лёгкий дождь", icon: "wi-rain" },
        lightrainnight: { text: "Лёгкий дождь", icon: "wi-rain" },
        rain: { text: "Дождь", icon: "wi-rain" },
        rainnight: { text: "Дождь", icon: "wi-rain" },
        heavyrain: { text: "Сильный дождь", icon: "wi-rain-wind" },
        heavyrainnight: { text: "Сильный дождь", icon: "wi-rain-wind" },
        lightsnow: { text: "Лёгкий снег", icon: "wi-snow" },
        lightsnownight: { text: "Лёгкий снег", icon: "wi-snow" },
        snow: { text: "Снег", icon: "wi-snow" },
        snownight: { text: "Снег", icon: "wi-snow" },
        heavysnow: { text: "Сильный снег", icon: "wi-snow-wind" },
        heavysnownight: { text: "Сильный снег", icon: "wi-snow-wind" },
      };

      const conditionData = conditions[weatherCode] || {
        text: "Неизвестно",
        icon: "wi-na",
      };
      console.log(conditionData);

      document.getElementById(
        "weather"
      ).textContent = `Условия: ${conditionData.text}`;
      let iconElement = document.getElementById("icon");
      iconElement.className = `weather-icon wi ${conditionData.icon}`;
    })
    .catch((error) => {
      console.error("Ошибка при получении данных погоды:", error);
      document.getElementById("weather").textContent = "Ошибка";
      console.log("Заход в catch fetch");
    });
};

const saveCityToLocalStorage = (city) => {
  try {
    localStorage.setItem("city", city);
  } catch (e) {
    console.error("Не удалось сохранить город в localStorage:", e);
  }
};

const setDefaultCity = () => {
  const defaultCity = "Краснодар";
  saveCityToLocalStorage(defaultCity);
  displayCity(defaultCity);
};

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getCityName(latitude, longitude);
  getWeather(latitude, longitude);
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
};

const error = (err) => {
  console.error(`Ошибка (${err.code}): ${err.message}`);
  setDefaultCity();
};

const initializeCity = () => {
  const storedCity = localStorage.getItem("city");
  const storedLatitude = localStorage.getItem("latitude");
  const storedLongitude = localStorage.getItem("longitude");

  if (storedCity || storedLatitude || storedLongitude) {
    displayCity(storedCity);
    getWeather(storedLatitude, storedLongitude);
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation не поддерживается вашим браузером.");
      setDefaultCity();
    }
  }
};

document.addEventListener("DOMContentLoaded", initializeCity);
