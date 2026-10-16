const DB='wander_photos_v2';const STORE='photos';
let dbPromise;
function database(){if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE,{keyPath:'id'});};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});return dbPromise;}
async function transaction(mode,operation){const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode);const store=tx.objectStore(STORE);const request=operation(store);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);tx.onerror=()=>reject(tx.error);});}
export const allPhotos=()=>transaction('readonly',store=>store.getAll());
export const addPhoto=async(file,placeId='')=>{if(!file.type.startsWith('image/')||!['image/jpeg','image/png','image/webp','image/gif','image/avif'].includes(file.type))throw Error('Unsupported image format');if(file.size>20*1024*1024)throw Error('Images must be smaller than 20 MB');if(!file.size)throw Error('Image is empty');const record={id:crypto.randomUUID(),name:file.name,file,placeId,created:Date.now()};await transaction('readwrite',store=>store.put(record));return record;};
export const removePhoto=id=>transaction('readwrite',store=>store.delete(id));
export const linkPhoto=(id,placeId)=>transaction('readwrite',store=>{const req=store.get(id);req.onsuccess=()=>{if(req.result)store.put({...req.result,placeId});};return req;});

export const updatePhoto=(id,updates)=>transaction('readwrite',store=>{const request=store.get(id);request.onsuccess=()=>{if(request.result)store.put({...request.result,...updates});};return request;});
export async function unlinkPlace(placeId){const records=await allPhotos();await Promise.all(records.filter(p=>p.placeId===placeId).map(p=>linkPhoto(p.id,'')));}
