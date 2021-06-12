const weather = document.querySelector(".js-weather"),
    weatherIcon = document.querySelector(".weather-icon"),
    jsLocation = document.querySelector(".js-location");

const API_KEY = "580cb1e4a7df57d913af71bad2f63c33";
const COORDS = 'coords';

function getWeather(lat, lon) {
    // 데이터를 가져올때 fetch 함수 사용. 
    // http 적는 곳에 백틱 `` 써야 함
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {     // then -> 데이터가 넘어오면 함수를 호출
        return response.json()
    }).then(function(json) {      // 가져온 데이터를 처리하는데 시간이 걸리므로 JSON 데이터가 준비되면 기다렸다가 실행
        // console.log(json);
        const temperature = parseFloat(json.main.temp).toFixed();
        const place = json.name;

        weather.innerText = `${temperature}°`;
        jsLocation.innerText = `${place}`;

        const icon = new Image();
        const imgName = json.weather[0].icon;
        
        icon.src = `https://openweathermap.org/img/wn/${imgName}.png`;
        weatherIcon.prepend(icon);
    });
    
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표 가져오는데 성공했을 때 콜백함수
function handleGeoSuccess(position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

// 좌표 가져오는데 실패시 콜백함수
function handleGeoError(position) {
    console.error("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init() {
    loadCoords();
}

init();