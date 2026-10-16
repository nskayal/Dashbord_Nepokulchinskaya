import {weatherCities} from './data.js';
const codes={0:['Clear sky','☀'],1:['Mainly clear','☀'],2:['Partly cloudy','⛅'],3:['Overcast','☁'],45:['Foggy','≋'],48:['Icy fog','≋'],51:['Light drizzle','☂'],53:['Drizzle','☂'],55:['Heavy drizzle','☂'],61:['Light rain','☂'],63:['Rain','☂'],65:['Heavy rain','☂'],71:['Light snow','❄'],73:['Snow','❄'],75:['Heavy snow','❄'],80:['Rain showers','☂'],81:['Showers','☂'],82:['Heavy showers','☂'],95:['Thunderstorm','ϟ'],96:['Thunderstorm','ϟ'],99:['Thunderstorm','ϟ']};
const description=code=>codes[code]||['Mixed conditions','☁'];
const content=document.getElementById('weatherContent');const forecast=document.getElementById('forecast');
let activeController=null;
export async function loadWeather(key='spb'){
 const location=weatherCities[key]||weatherCities.spb;
 if(activeController)activeController.abort();const controller=new AbortController();activeController=controller;
 content.innerHTML='<p class="weather-message">Checking the sky…</p>';forecast.innerHTML='';
 const url=new URL('https://api.open-meteo.com/v1/forecast');
 url.search=new URLSearchParams({latitude:String(location.lat),longitude:String(location.lng),current:'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',daily:'weather_code,temperature_2m_max,temperature_2m_min',timezone:'Europe/Moscow',forecast_days:'4'}).toString();
 try{
  const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw Error(`HTTP ${response.status}`);
  const json=await response.json();if(typeof json.current?.temperature_2m!=='number'||!Array.isArray(json.daily?.time))throw Error('Unexpected weather response');
  if(controller!==activeController)return;
  const current=json.current;const [condition,symbol]=description(current.weather_code);
  content.innerHTML=`<div class="weather-main"><div><span class="weather-city">${location.name.toUpperCase()} ↗</span><div class="temperature">${Math.round(current.temperature_2m)}<sup>°C</sup></div><strong>${condition}</strong></div><span class="weather-art" aria-hidden="true">${symbol}</span></div><div class="weather-details"><span>WIND <b>${Math.round(current.wind_speed_10m)} km/h</b></span><span>RAIN <b>${Number(current.precipitation).toFixed(1)} mm</b></span></div>`;
  forecast.innerHTML=json.daily.time.slice(1,4).map((date,index)=>`<div><span>${new Intl.DateTimeFormat('en',{weekday:'short',timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`)).toUpperCase()}</span><strong>${description(json.daily.weather_code[index+1])[1]}</strong><b>${Math.round(json.daily.temperature_2m_max[index+1])}°</b></div>`).join('');
 }catch(error){if(error.name==='AbortError')return;console.warn('Weather load failed:',error);content.innerHTML='<p class="weather-message error">Weather is unavailable right now. Check your connection and press REFRESH WEATHER to retry.</p>';forecast.innerHTML='';}
}
export function cancelWeather(){activeController?.abort();activeController=null;}
