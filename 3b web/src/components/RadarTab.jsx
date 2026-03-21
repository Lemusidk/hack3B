import { useEffect, useRef, useState } from 'react';

export default function RadarTab({ location, onSelectStore }) {
 const { userPos, nearbyStores, selectedStore, setSelectedStore, loading } = location;
 const mapRef = useRef(null), mapObj = useRef(null);
 const markers = useRef([]), userMark = useRef(null), poly = useRef(null);
 const [ready, setReady] = useState(false);

 useEffect(() => {
 if (mapObj.current || !mapRef.current) return;
 import('leaflet').then(L => {
 delete L.Icon.Default.prototype._getIconUrl;
 L.Icon.Default.mergeOptions({
 iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
 iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
 shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
 });
 const map = L.map(mapRef.current,{center:[19.4326,-99.1332],zoom:12,zoomControl:true,attributionControl:false});
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
 mapObj.current = map; setReady(true);
 });
 return () => { if(mapObj.current){mapObj.current.remove();mapObj.current=null;} };
 }, []);

 useEffect(() => {
 if (!ready||!mapObj.current||!nearbyStores.length) return;
 import('leaflet').then(L => {
 const map = mapObj.current;
 markers.current.forEach(m=>m.remove()); markers.current=[];
 if(userMark.current) userMark.current.remove();
 if(poly.current) poly.current.remove();

 if(userPos){
 userMark.current=L.marker([userPos.lat,userPos.lng],{icon:L.divIcon({className:'',
 html:`<div style="width:14px;height:14px;background:#3B82F6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.2)"></div>`,
 iconSize:[14,14],iconAnchor:[7,7]})}).addTo(map);
 map.setView([userPos.lat,userPos.lng],13);
 }

 nearbyStores.forEach(s=>{
 const sel=selectedStore?.id===s.id;
 const ic=L.divIcon({className:'',
 html:`<div style="width:${sel?40:32}px;height:${sel?40:32}px;background:${sel?'#ED1C24':'white'};color:${sel?'white':'#ED1C24'};border:2px solid #ED1C24;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:9px;font-family:sans-serif;box-shadow:0 2px 8px rgba(237,28,36,${sel?0.4:0.15})">3B</div>`,
 iconSize:[sel?40:32,sel?40:32],iconAnchor:[sel?20:16,sel?20:16]});
 markers.current.push(
 L.marker([s.lat,s.lng],{icon:ic}).addTo(map).on('click',()=>{
 setSelectedStore(s);
 map.setView([s.lat,s.lng],15);
 })
 );
 });

 if(selectedStore&&userPos){
 poly.current=L.polyline([[userPos.lat,userPos.lng],[selectedStore.lat,selectedStore.lng]],
 {color:'#ED1C24',weight:3,opacity:0.55,dashArray:'8 5'}).addTo(map);
 }
 });
 }, [ready, nearbyStores, selectedStore, userPos]);

 function selectStore(s) {
 setSelectedStore(s);
 if(mapObj.current) mapObj.current.setView([s.lat,s.lng],15);
 }

 return (
 <div className="flex flex-col h-full bg-[#F5F5F5]">
 {/* Map */}
 <div className="relative flex-shrink-0" style={{height:'42vh'}}>
 {(loading||!ready)&&(
 <div className="absolute inset-0 z-10 bg-neutral-100 flex items-center justify-center">
 <div className="w-7 h-7 border-2 border-[#ED1C24] border-t-transparent rounded-full animate-spin"/>
 </div>
 )}
 <div ref={mapRef} className="w-full h-full"/>
 </div>

 {/* Selected quick bar — tap opens detail page */}
 {selectedStore && (
 <button onClick={() => onSelectStore(selectedStore)}
 className="mx-4 mt-3 bg-[#ED1C24] text-white p-3 flex items-center gap-3 flex-shrink-0 active:opacity-80 w-[calc(100%-2rem)]">
 <div className="w-9 h-9 bg-white/20 flex items-center justify-center shrink-0">
 <img src="/logo.png" alt="3B" className="w-6 object-contain" />
 </div>
 <div className="flex-1 text-left min-w-0">
 <p className="font-black text-sm truncate">{selectedStore.name}</p>
 <p className="text-white/70 text-xs font-bold">{selectedStore.distanceLabel} · {selectedStore.horario}</p>
 </div>
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
 <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </button>
 )}

 {/* Stores list */}
 <div className="flex-1 overflow-y-auto px-4 sm:px-8 pt-3 pb-4 space-y-2">
 <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Tiendas cercanas</p>
 {nearbyStores.map(s=>{
 const sel=selectedStore?.id===s.id;
 return(
 <button key={s.id}
 onClick={()=>selectStore(s)}
 className={`w-full flex items-center gap-3 p-3 border-2 text-left transition-colors ${sel?'bg-[#FDE4E5] border-[#ED1C24]':'bg-white border-neutral-200'}`}>
 <div className={`w-9 h-9 flex items-center justify-center shrink-0 ${sel?'bg-[#ED1C24]':'bg-[#FDE4E5]'}`}>
 <span className={`font-black text-xs ${sel?'text-white':'text-[#ED1C24]'}`}>3B</span>
 </div>
 <div className="flex-1 min-w-0">
 <p className={`text-sm font-black truncate ${sel?'text-[#ED1C24]':'text-gray-900'}`}>{s.name}</p>
 <p className="text-xs text-neutral-500 font-bold truncate">{s.colonia}</p>
 </div>
 <div className="text-right shrink-0">
 <p className={`text-sm font-black ${sel?'text-[#ED1C24]':'text-neutral-700'}`}>{s.distanceLabel}</p>
 <p className="text-[10px] text-neutral-400 font-bold">{s.horario}</p>
 </div>
 </button>
 );
 })}
 </div>
 </div>
 );
}
