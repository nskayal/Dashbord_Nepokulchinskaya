let map=null,layer=null,observer=null,frameHandle=0;
const colors={visited:'#a9e341',favorite:'#ffb622',wishlist:'#2c9fe8'};
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const valid=p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng);
export function initMap(onPlace,onFavorite){
 const target=document.getElementById('leafletMap');if(map||!target)return;
 if(!window.L){target.textContent='Map library unavailable. Check your connection.';return;}
 // Leaflet must initialize when its real, visible container dimensions are known.
 if(!target.clientWidth||!target.clientHeight){setTimeout(()=>{if(document.getElementById('leafletMap')===target&&target.closest('.widget:not([hidden]):not(.is-collapsed)'))initMap(onPlace,onFavorite);},250);return;}
 map=window.L.map(target,{zoomControl:false,scrollWheelZoom:true,touchZoom:true,doubleClickZoom:true,boxZoom:true,minZoom:6,maxZoom:18,zoomSnap:0.5,maxBoundsViscosity:0,preferCanvas:false}).setView([60.12,30.16],8);
 window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{minZoom:6,maxZoom:18,attribution:'© OpenStreetMap contributors',crossOrigin:true}).addTo(map);
 window.L.control.zoom({position:'bottomright'}).addTo(map);
 layer=window.L.layerGroup().addTo(map);
 map.on('popupopen',event=>{const popup=event.popup.getElement();popup?.querySelector('[data-open-place]')?.addEventListener('click',e=>onPlace(e.currentTarget.dataset.openPlace));popup?.querySelector('[data-favorite-place]')?.addEventListener('click',e=>onFavorite(e.currentTarget.dataset.favoritePlace));});
 observer=new ResizeObserver(()=>refreshMapSize());observer.observe(target);
 document.fonts?.ready.then(()=>refreshMapSize());
 refreshMapSize();setTimeout(refreshMapSize,600);setTimeout(refreshMapSize,1250);
}
export function updateMap(places,filter='all'){
 if(!map||!layer)return;layer.clearLayers();
 places.filter(valid).filter(p=>p.status!=='explore'||p.favorite).filter(p=>filter==='all'||(filter==='favorite'?p.favorite:p.status===filter)).forEach(place=>{
 const kind=place.favorite?'favorite':place.status;
 const icon=window.L.divIcon({className:'custom-pin',html:`<span class="pin-point" style="--pin:${colors[kind]||colors.wishlist}"></span>`,iconSize:[34,41],iconAnchor:[17,40]});
 const marker=window.L.marker([place.lat,place.lng],{icon}).addTo(layer);
 marker.bindPopup(`<div class="place-popup"><img src="${escapeHTML(place.image||'')}" alt=""><small>${escapeHTML(place.category)} / ${escapeHTML(place.status)}</small><strong>${escapeHTML(place.name)}</strong><span>${escapeHTML(place.date||'A future adventure')}</span><button type="button" data-open-place="${escapeHTML(place.id)}">VIEW THIS PLACE ↗</button><button type="button" data-favorite-place="${escapeHTML(place.id)}">${place.favorite?'♥ REMOVE FAVORITE':'♡ ADD FAVORITE'}</button></div>`,{maxWidth:230});
 });
}
export function focusMap(place){if(!map||!valid(place))return false;refreshMapSize();map.flyTo([place.lat,place.lng],Math.max(map.getZoom(),11),{duration:0.7});return true;}
export function refreshMapSize(){if(!map)return;cancelAnimationFrame(frameHandle);frameHandle=requestAnimationFrame(()=>{if(map&&map.getContainer().getBoundingClientRect().width>0)map.invalidateSize({pan:false,animate:false});});}
export function destroyMap(){cancelAnimationFrame(frameHandle);observer?.disconnect();observer=null;if(map){map.off();map.remove();map=null;layer=null;}}
