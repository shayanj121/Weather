const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')
const spanc = document.querySelector('.c')
const spanf = document.querySelector('.f')
const box = document.querySelector('.box')
const p = document.querySelector('p')
const inp = document.querySelector('input')
const btn = document.querySelector('button')
const icon = document.querySelector('img')




const API_URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = "183c515c4bc6405e94e223957252401";
let LOCATION = "tehran";
const REFRESH_INTERVAL = 300000;
async function fetchWeather() {
    try {

        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${LOCATION}&aqi=yes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Weather Data:", data);
        h1.innerHTML = data.location.name
        spanc.innerHTML = data.current.temp_c + " °C";
        spanf.innerHTML = data.current.temp_f + " °F";
        p.innerHTML = data.current.condition.text;
        icon.src = "https:" + data.current.condition.icon;
        h2.innerHTML= data.location.country
        
        const weatherType = getWeatherType(data.current.condition.code);

        switch (weatherType) {
            case "rainy":
                box.style.backgroundImage = "url('img/rain.jpg')";
                
                break;
            case "snowy":
                box.style.backgroundImage = "url('img/snowy.jpg')";
                
                break;
            case "sunny":
                box.style.backgroundImage = "url('img/sunny.jpg')";
                
                break;
            case "cloudy":
                box.style.backgroundImage = "url('img/cloudy.jpg')";
                
                break;
            default:
                box.style.backgroundImage = "url()";
                
        }
        console.log(data.current.condition.code);
        

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
fetchWeather();
setInterval(fetchWeather, REFRESH_INTERVAL);

const rainyCodes = [1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201];
const snowyCodes = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258];
const sunnyCodes = [1000];
const cloudyCodes = [1003, 1006, 1009];

function getWeatherType(code) {
    if (rainyCodes.includes(code)) {
        return "rainy";
    } else if (snowyCodes.includes(code)) {
        return "snowy";
    } else if (sunnyCodes.includes(code)) {
        return "sunny";
    } else if (cloudyCodes.includes(code)) {
        return "cloudy";
    } else {
        return "other";
    }
}
document.addEventListener('mousemove', (e) => {
    const boxRect = box.getBoundingClientRect(); 

    if (
        e.clientX >= boxRect.left &&
        e.clientX <= boxRect.right &&
        e.clientY >= boxRect.top &&
        e.clientY <= boxRect.bottom
    ) {
        const xPercent = ((e.clientX - boxRect.left) / boxRect.width) * 100;
        const yPercent = ((e.clientY - boxRect.top) / boxRect.height) * 100;

        box.style.backgroundPosition = `${xPercent/10}% ${yPercent/10}%`;
    }
});
btn.addEventListener('click', ()=> {
    let val = inp.value
    LOCATION = val
    fetchWeather();
});
