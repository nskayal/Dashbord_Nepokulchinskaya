import {widgets} from './data.js';
import {toast} from './ui.js';
import {cancelWeather,loadWeather} from './weather.js';
import {initMap,destroyMap,refreshMapSize} from './map.js';
import {loadDaylight,cancelDaylight} from './daylight.js';

export class UIComponent {
 constructor(id,title,context){this.id=id;this.title=title;this.context=context;this.node=document.getElementById(`widget-${id}`);this.abort=new AbortController();this.collapsed=false;}
 render(){if(!this.node)throw Error(`Missing widget: ${this.id}`);this.node.hidden=false;this.node.style.display='';this.controls=document.createElement('div');this.controls.className='widget-controls';this.controls.innerHTML='<button type="button" data-control="collapse" aria-label="Collapse widget">−</button><button type="button" data-control="remove" aria-label="Remove widget">×</button>';this.node.querySelector('.widget-header')?.append(this.controls);this.node.addEventListener('click',e=>{const action=e.target.closest('[data-control]')?.dataset.control;if(action==='collapse')this.collapsed?this.expand():this.collapse();if(action==='remove')this.context.dashboard.removeWidget(this.id);},{signal:this.abort.signal});this.node.classList.remove('is-collapsed');return this.node;}
 collapse(){if(this.collapsed)return;this.collapsed=true;this.node.classList.add('is-collapsed');this.controls.querySelector('[data-control="collapse"]').textContent='+';this.controls.querySelector('[data-control="collapse"]').setAttribute('aria-label','Expand widget');this.context.state.collapsed[this.id]=true;this.context.persist();}
 expand(){if(!this.collapsed)return;this.collapsed=false;this.node.classList.remove('is-collapsed');this.controls.querySelector('[data-control="collapse"]').textContent='−';this.controls.querySelector('[data-control="collapse"]').setAttribute('aria-label','Collapse widget');this.context.state.collapsed[this.id]=false;this.context.persist();if(this.id==='map')requestAnimationFrame(()=>setTimeout(()=>{initMap(this.context.showDetail,this.context.favorite);refreshMapSize();this.context.refresh();},120));}
 destroy(){this.abort.abort();this.controls?.remove();this.node?.classList.remove('is-collapsed');this.node.hidden=true;this.node.style.display='none';}
}
export class MapWidget extends UIComponent {render(){super.render();initMap(this.context.showDetail,this.context.favorite);return this.node;} destroy(){destroyMap();super.destroy();}}
export class GalleryWidget extends UIComponent {}
export class WishlistWidget extends UIComponent {}
export class FavoritesWidget extends UIComponent {}
export class StatisticsWidget extends UIComponent {}
export class WeatherWidget extends UIComponent {render(){super.render();loadWeather(document.getElementById('weatherCity').value);return this.node;}destroy(){cancelWeather();super.destroy();}}
export class DaylightWidget extends UIComponent {render(){super.render();loadDaylight(document.getElementById('daylightCity')?.value||'spb');return this.node;}destroy(){cancelDaylight();super.destroy();}} 
const types={map:MapWidget,gallery:GalleryWidget,wishlist:WishlistWidget,favorites:FavoritesWidget,statistics:StatisticsWidget,weather:WeatherWidget,daylight:DaylightWidget};
export class Dashboard {
 constructor(context){this.context=context;this.instances=new Map();context.dashboard=this;}
 addWidget(type,quiet=false){if(!types[type])return false;if(this.instances.has(type)){if(!quiet)toast(`${widgets.find(w=>w.id===type)?.title||type} is already on your wall`);return false;}const instance=new types[type](type,widgets.find(w=>w.id===type).title,this.context);this.instances.set(type,instance);instance.render();this.context.state.visible[type]=true;if(this.context.state.collapsed[type])instance.collapse();this.context.persist();if(!quiet)this.context.refresh();return true;}
 removeWidget(id){const instance=this.instances.get(id);if(!instance)return false;instance.destroy();this.instances.delete(id);this.context.state.visible[id]=false;this.context.persist();this.context.refresh();return true;}
 restoreWidgets(){for(const w of widgets){if(this.context.state.visible[w.id]!==false)this.addWidget(w.id,true);else{const node=document.getElementById(`widget-${w.id}`);node.hidden=true;node.style.display='none';}}this.context.refresh();}
}
