import {weatherCities} from './data.js';

let currentController=null;
const zone='Europe/Moscow';
const clock=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:zone});
function time(value){if(!value)return '—';const parsed=new Date(value);return Number.isNaN(parsed.getTime())?'—':clock.format(parsed);}
function length(value){if(!Number.isFinite(value))return '—';return `${Math.floor(value/3600)} h ${Math.floor((value%3600)/60)} min`;}
function row(title,value){return `<div class="daylight-hour"><small>${title}</small><span>${value}</span></div>`;}
function golden(value){return value?.begin&&value?.end?`${time(value.begin)} – ${time(value.end)}`:'Not available today';}
export function cancelDaylight(){currentController?.abort();currentController=null;}
export async function loadDaylight(key='spb'){
 const content=document.getElementById('daylightResults');if(!content)return;
 cancelDaylight();const controller=new AbortController();currentController=controller;
 const place=weatherCities[key]||weatherCities.spb;
 content.innerHTML='<p class="weather-message" role="status">Checking the sunlight…</p>';
 const params=new URLSearchParams({lat:String(place.lat),lng:String(place.lng),tz:zone});
 try{
  const response=await fetch(`https://api.sunrise-sunset.org/v2?${params}`,{signal:controller.signal});
  if(!response.ok)throw new Error(`Sunrise-Sunset API HTTP ${response.status}`);
  const result=await response.json();
  if(result.error||!result.sun_status||!('sunrise'in result)||!('sunset'in result)||!('golden_hour'in result))throw new Error(result.message||'Unexpected response from Sunrise-Sunset API');
  if(currentController!==controller)return;
  content.innerHTML=`<div class="daylight-main"><div class="daylight-reading"><small>↗ SUNRISE</small><strong>${time(result.sunrise)}</strong></div><div class="daylight-reading"><small>↘ SUNSET</small><strong>${time(result.sunset)}</strong></div></div>${row('DAYLIGHT',length(result.day_length))}${row('MORNING GOLDEN HOUR',golden(result.golden_hour?.morning))}${row('EVENING GOLDEN HOUR',golden(result.golden_hour?.evening))}<p class="explore-note">${place.name.toUpperCase()} · MOSCOW TIME (UTC+3)</p>`;
 }catch(error){
  if(controller.signal.aborted||currentController!==controller)return;
  console.error('WANDER Daylight API error:',error);
  content.innerHTML='<p class="weather-message error" role="alert">Unable to load daylight information. Check your connection and press Retry.</p>';
 }finally{if(currentController===controller)currentController=null;}
}
