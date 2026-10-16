// Illustrative images from Unsplash are used only in demo cards, never added to personal uploads.
export const photo = {
  city: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?w=1000&q=85',
  palace: 'https://images.unsplash.com/photo-1548834925-e48f8a27ae75?w=900&q=85',
  water: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=850&q=85',
  woods: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85',
  architecture: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=85',
  coast: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=85'
};
export const seedPlaces = [
 {id:'p1', name:'Исаакиевский собор', english:'St. Isaac’s Cathedral', category:'Architecture', lat:59.9343, lng:30.3061, date:'2026-05-16', status:'visited', favorite:true, image:photo.city},
 {id:'p2', name:'Петергоф', english:'Peterhof', category:'Parks', lat:59.8853, lng:29.9080, date:'2026-06-12', status:'visited', favorite:true, image:photo.palace},
 {id:'p3', name:'Новая Голландия', english:'New Holland Island', category:'Parks', lat:59.9295, lng:30.2898, date:'2026-07-04', status:'visited', favorite:true, image:photo.architecture},
 {id:'p4', name:'Выборг', english:'Vyborg', category:'Architecture', lat:60.7105, lng:28.7494, date:'', status:'wishlist', favorite:false, image:photo.architecture},
 {id:'p5', name:'Ладожские шхеры', english:'Ladoga Skerries', category:'Nature', lat:61.036, lng:30.091, date:'', status:'wishlist', favorite:false, image:photo.water},
 {id:'p6', name:'Саблинские пещеры', english:'Sablino Caves', category:'Nature', lat:59.6687, lng:30.7955, date:'', status:'wishlist', favorite:false, image:photo.woods},
 {id:'p7', name:'Эрмитаж', english:'The Hermitage', category:'Museums', lat:59.9398, lng:30.3146, date:'2026-04-19', status:'visited', favorite:false, image:photo.palace},
 {id:'p8', name:'Крепость Орешек', english:'Oreshek Fortress', category:'Architecture', lat:59.9530, lng:31.038, date:'', status:'explore', favorite:false, image:photo.coast},
 {id:'p9', name:'Монрепо', english:'Monrepos Park', category:'Parks', lat:60.7309, lng:28.724, date:'', status:'explore', favorite:false, image:photo.woods},
 {id:'p10', name:'Музей Фаберже', english:'Fabergé Museum', category:'Museums', lat:59.9345, lng:30.3429, date:'', status:'explore', favorite:false, image:photo.architecture},
 {id:'p11', name:'Комаровский берег', english:'Komarovo Coast', category:'Nature', lat:60.1859, lng:29.787, date:'', status:'explore', favorite:false, image:photo.coast}
];
export const widgets = [
 {id:'map',title:'My Map'}, {id:'gallery',title:'Photo Gallery'}, {id:'wishlist',title:'Wishlist'},
 {id:'favorites',title:'Favorites'}, {id:'statistics',title:'My Statistics'},
 {id:'weather',title:'Weather'}, {id:'daylight',title:'Daylight'}
];
// Shared, curated coordinates (WGS84) for both API widgets.
// Saint Petersburg comes first; the remaining settlements are alphabetized in Russian.
export const weatherCities = {
 spb:{name:'Санкт-Петербург',lat:59.9343,lng:30.3351},
 boksitogorsk:{name:'Бокситогорск',lat:59.4738,lng:33.8477},
 volosovo:{name:'Волосово',lat:59.4445,lng:29.4848},
 volkhov:{name:'Волхов',lat:59.9258,lng:32.3315},
 vsevolozhsk:{name:'Всеволожск',lat:60.0191,lng:30.6460},
 vyborg:{name:'Выборг',lat:60.7105,lng:28.7494},
 vyritsa:{name:'Вырица',lat:59.4079,lng:30.3480},
 gatchina:{name:'Гатчина',lat:59.5764,lng:30.1283},
 zelenogorsk:{name:'Зеленогорск',lat:60.1997,lng:29.7025},
 ivangorod:{name:'Ивангород',lat:59.3715,lng:28.2163},
 kingisepp:{name:'Кингисепп',lat:59.3733,lng:28.6134},
 kirishi:{name:'Кириши',lat:59.4497,lng:32.0080},
 kirovsk:{name:'Кировск',lat:59.8812,lng:30.9816},
 kolpino:{name:'Колпино',lat:59.7490,lng:30.5886},
 kommunar:{name:'Коммунар',lat:59.6207,lng:30.3938},
 kronstadt:{name:'Кронштадт',lat:59.9954,lng:29.7667},
 lodeynoye:{name:'Лодейное Поле',lat:60.7260,lng:33.5531},
 lomonosov:{name:'Ломоносов',lat:59.9107,lng:29.7767},
 luga:{name:'Луга',lat:58.7374,lng:29.8454},
 otradnoye:{name:'Отрадное',lat:59.7771,lng:30.8180},
 pavlovsk:{name:'Павловск',lat:59.6864,lng:30.4318},
 peterhof:{name:'Петергоф',lat:59.8845,lng:29.9074},
 podradye:{name:'Подпорожье',lat:60.9112,lng:34.1678},
 primorsk:{name:'Приморск',lat:60.3661,lng:28.6107},
 priozersk:{name:'Приозерск',lat:61.0393,lng:30.1291},
 pushkin:{name:'Пушкин',lat:59.7200,lng:30.4046},
 repino:{name:'Репино',lat:60.1731,lng:29.8708},
 roshchino:{name:'Рощино',lat:60.2550,lng:29.6098},
 sverdlova:{name:'Посёлок имени Свердлова',lat:59.7961,lng:30.6616},
 sestroretsk:{name:'Сестрорецк',lat:60.0957,lng:29.9721},
 siversky:{name:'Сиверский',lat:59.3540,lng:30.0794},
 slantsy:{name:'Сланцы',lat:59.1178,lng:28.0881},
 sosnovo:{name:'Сосново',lat:60.5512,lng:30.2141},
 sosnovybor:{name:'Сосновый Бор',lat:59.8961,lng:29.0851},
 svetogorsk:{name:'Светогорск',lat:61.1121,lng:28.8589},
 sertolovo:{name:'Сертолово',lat:60.1436,lng:30.2116},
 tikhvin:{name:'Тихвин',lat:59.6442,lng:33.5297},
 tosno:{name:'Тосно',lat:59.5407,lng:30.8777},
 shlisselburg:{name:'Шлиссельбург',lat:59.9449,lng:31.0347}
};
export const weatherCityOptions = Object.entries(weatherCities)
 .sort(([ka,a],[kb,b])=>ka==='spb'?-1:kb==='spb'?1:a.name.localeCompare(b.name,'ru'));
