const images = ["img/01.jpg", "img/02.jpg", "img/03.jpg", "img/04.jpg"];
images.forEach((image) => {
  const img = new Image();
  img.src = image;
});

const getCurrentHour = () => {
  const now = new Date();
  return now.getHours();
};

const getBackgroundImage = () => {
  const hour = getCurrentHour();
  if (hour >= 0 && hour < 6) {
    return "img/01.jpg"; // 00:00 - 06:00
  } else if (hour >= 6 && hour < 12) {
    return "img/02.jpg"; // 06:00 - 12:00
  } else if (hour >= 12 && hour < 18) {
    return "img/03.jpg"; // 12:00 - 18:00
  } else {
    return "img/04.jpg"; // 18:00 - 00:00
  }
};

const setBackground = () => {
  const bgImage = getBackgroundImage();
  document.body.style.backgroundImage = `url('${bgImage}')`;
  document.body.style.backgroundImage = `url('${bgImage}')`;
};

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const updateDate = () => {
  const now = new Date();

  // время собирается вручную
  // let hours = now.getHours();
  // let minutes = now.getMinutes();
  // let seconds = now.getSeconds();

  // hours = hours < 10 ? "0" + hours : hours;
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? "0" + seconds : seconds;

  // const currentTime = `${hours}:${minutes}:${seconds}`;

  // время через Intl.DateTimeFormat
  const currentTime = timeFormatter.format(now);

  document.getElementById("time").textContent = currentTime;

  // дата собирается вручную
  // const day = now.getDate();
  // const month = now.getMonth();
  // const weekday = now.getDay();

  // const months = [
  //   "января",
  //   "февраля",
  //   "марта",
  //   "апреля",
  //   "мая",
  //   "июня",
  //   "июля",
  //   "августа",
  //   "сентября",
  //   "октября",
  //   "ноября",
  //   "декабря",
  // ];

  // const weekdays = [
  //   "воскресенье",
  //   "понедельник",
  //   "вторник",
  //   "среда",
  //   "четверг",
  //   "пятница",
  //   "суббота",
  // ];

  // const currentDate = `${day} ${months[month]}, ${weekdays[weekday]}`;

  // дата методом toLocaleDateString
  // const options = { day: "numeric", month: "long", weekday: "long" };
  // const currentDate = now.toLocaleDateString("ru-RU", options);

  // дата через Intl.DateTimeFormat
  const currentDate = dateFormatter.format(now);

  document.getElementById("date").textContent = currentDate;
};

const startClock = () => {
  updateDate();
  setInterval(() => {
    updateDate();
  }, 1000);
};

window.onload = () => {
  setBackground();
  startClock();
};
