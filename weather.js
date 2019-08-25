const API_KEY = "064fcc7c1f39ddb57a2a1aac979f439e";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
function getWeather(lat, long){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    console.log(json);
    const temperature = Math.floor(json.main.temp);
    const place = json.name;
    const nationality = json.sys.country;
    const description = json.weather[0].description;
    weather.innerText = `${temperature}°C, ${description}
    @ ${place}, ${nationality}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  // console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // latitude: latitude,
    // longitude: longitude
    //같은 이름 사용 할 시, 이렇게 줄여서 사용 가능
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Can't handle geo location");
}

function askForCoords(){
  //api navigator
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{
    //get weather
    const parseCoords = JSON.parse(loadedCoords);
    // console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
