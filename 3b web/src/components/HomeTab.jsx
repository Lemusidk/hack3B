import { useEffect, useRef, useState } from 'react';
import MissionCard from './MissionCard.jsx';

// Colores de la paleta oficial 3B
const PROMOS = [
 { id:1, tag:'PAQUETE DE LIMPIEZA TOTAL', price:'$69.90', img:'/prod_topwind.png', bg:'#4F4F4F', accent:'#F16D71', sub:'Elimina suciedad fácilmente' },
 { id:2, tag:'REFRESCO DEL MES', price:'$15.00', img:'/prod_burst.png', bg:'#ED1C24', accent:'#FCFCFC', sub:'8 Calorías, 0 Azúcar' },
 { id:3, tag:'DÚO DE DESPENSA', price:'2x1', img:'/prod_atun.png', bg:'#C3171E', accent:'#F9BDBF', sub:'Un sándwich perfecto' },
 { id:4, tag:'SET DE BELLEZA', price:'$120.00',img:'/prod_rubor.png', bg:'#4F4F4F', accent:'#FDE4E5', sub:'Tonos Bronze, Rosé, Ginger' },
 { id:5, tag:'FIBRA ESPONJA', price:'$12.00', img:'/prod_esponja.png', bg:'#9A9A9A', accent:'#FCFCFC', sub:'Multiusos básica' },
 { id:6, tag:'QUESO MANCHEGO', price:'$34.00', img:'/prod_manchego.png', bg:'#ED1C24', accent:'#FDE4E5', sub:'7 rebanadas LactiBu' },
];

export default function HomeTab({ game, location, onTabChange, onOpenRadar }) {
 const { missions, points, isCompleted, completeMission, getLevel } = game;
 const { nearbyStores, selectedStore, setSelectedStore, loading } = location;
 const [toast, setToast] = useState(null);
 const [promoIdx, setPromoIdx] = useState(0);
 const mapRef = useRef(null);
 const mapObj = useRef(null);
 const markers = useRef([]);
 const startX = useRef(0);

 const userName = localStorage.getItem('3bq_name') || 'Explorador';
 const level = getLevel();
 const done = missions.filter(m => isCompleted(m.id)).length;
 const recompensas = Math.floor(points / 100);
 const maxIdx = PROMOS.length - 3;

 function prevPromo() { setPromoIdx(i => Math.max(0, i - 1)); }
 function nextPromo() { setPromoIdx(i => Math.min(maxIdx, i + 1)); }
 function onTouchStart(e) { startX.current = e.touches[0].clientX; }
 function onTouchEnd(e) {
 const dx = startX.current - e.changedTouches[0].clientX;
 if (dx > 40) nextPromo();
 else if (dx < -40) prevPromo();
 }

 function handleComplete(m) {
 completeMission(m);
 setToast(`+${m.pts} pts — Misión completada`);
 setTimeout(() => setToast(null), 2500);
 }

 useEffect(() => {
 if (!mapRef.current || mapObj.current) return;
 import('leaflet').then(L => {
 delete L.Icon.Default.prototype._getIconUrl;
 L.Icon.Default.mergeOptions({
 iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
 iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
 shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
 });
 const map = L.map(mapRef.current, {
 center:[19.4326,-99.1332], zoom:13,
 zoomControl:false, attributionControl:false,
 dragging:false, scrollWheelZoom:false,
 doubleClickZoom:false, touchZoom:false, keyboard:false,
 });
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
 mapObj.current = map;
 });
 return () => { if (mapObj.current) { mapObj.current.remove(); mapObj.current = null; } };
 }, []);

 useEffect(() => {
 if (!mapObj.current || !nearbyStores.length) return;
 import('leaflet').then(L => {
 markers.current.forEach(m => m.remove()); markers.current = [];
 nearbyStores.slice(0,6).forEach(store => {
 const isSel = selectedStore?.id === store.id;
 const icon = L.divIcon({
 className:'',
 html:`<div style="width:${isSel?36:28}px;height:${isSel?36:28}px;background:${isSel?'#ED1C24':'white'};color:${isSel?'white':'#ED1C24'};border:2px solid #ED1C24;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:8px;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.2)">3B</div>`,
 iconSize:[isSel?36:28,isSel?36:28], iconAnchor:[isSel?18:14,isSel?18:14],
 });
 markers.current.push(L.marker([store.lat,store.lng],{icon}).addTo(mapObj.current));
 });
 if (nearbyStores[0]) mapObj.current.setView([nearbyStores[0].lat,nearbyStores[0].lng],13);
 });
 }, [nearbyStores, selectedStore]);

 function openRadarWith(store) {
 if (store) setSelectedStore(store);
 onOpenRadar(store || null);
 }

 return (
 <div className="flex flex-col min-h-full bg-[#F9F9F9] w-full">

 {/* HEADER */}
 <div className="bg-[#ED1C24] pt-12 pb-4 px-4 sm:px-8">
 <div className="flex items-center justify-between mb-2">
 <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">
 Nivel: {['Explorador','Cazador','Maestro','Leyenda 3B'].indexOf(level.name)+1}
 </p>
 <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
 <circle cx="12" cy="8" r="4" fill="white"/>
 <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
 </svg>
 </div>
 </div>
 <p className="text-white font-black text-lg uppercase leading-tight mb-3">
 Bienvenido {userName}
 </p>
 <div className="flex gap-2">
 <div className="flex-1 bg-white px-3 py-2 flex items-center gap-2">
 <img src="/logo.png" alt="" className="h-5 object-contain shrink-0"/>
 <p className="text-[#ED1C24] font-black text-sm leading-none">{points.toLocaleString()} puntos</p>
 </div>
 <div className="flex-1 bg-white px-3 py-2 flex items-center gap-2">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
 <path d="M20 7H4a1 1 0 00-1 1v2h18V8a1 1 0 00-1-1z" fill="#ED1C24"/>
 <path d="M3 11v8a1 1 0 001 1h16a1 1 0 001-1v-8H3z" stroke="#ED1C24" strokeWidth="1.5" fill="none"/>
 <path d="M12 7c0-1.5-1-3-3-3s-2 3 3 3zM12 7c0-1.5 1-3 3-3s2 3-3 3z" stroke="#ED1C24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
 </svg>
 <p className="text-[#ED1C24] font-black text-sm leading-none">{recompensas} Recompensas</p>
 </div>
 </div>
 </div>

 <div className="px-4 sm:px-8 pt-4 pb-4 space-y-4 max-w-4xl mx-auto w-full">

 {/* CARRUSEL */}
 <div>
 <div className="flex items-center justify-between mb-2">
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Promociones</p>
 <div className="flex items-center gap-2">
 <div className="flex gap-1">
 {Array.from({length:maxIdx+1}).map((_,i)=>(
 <div key={i} className={`h-1.5 transition-all ${i===promoIdx?'w-4 bg-[#ED1C24]':'w-1.5 bg-[#E0E0E0]'}`}/>
 ))}
 </div>
 <button onClick={prevPromo} disabled={promoIdx===0} className="w-6 h-6 flex items-center justify-center disabled:opacity-30">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </button>
 <button onClick={nextPromo} disabled={promoIdx===maxIdx} className="w-6 h-6 flex items-center justify-center disabled:opacity-30">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </button>
 </div>
 </div>
 <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
 <div className="flex gap-2 transition-transform duration-300"
 style={{transform:`translateX(calc(-${promoIdx} * (33.333% + 0.5rem)))`}}>
 {PROMOS.map(p => (
 <div key={p.id} className="shrink-0 overflow-hidden border-2 border-[#E0E0E0]"
 style={{width:'calc(33.333% - 0.33rem)'}}>
 <div className="px-1.5 pt-1.5 pb-1" style={{background:p.bg}}>
 <p className="font-black text-[8px] uppercase leading-tight" style={{color:p.accent}}>{p.tag}</p>
 <p className="font-black text-sm leading-tight text-white">{p.price}</p>
 </div>
 <div className="bg-[#FCFCFC] flex items-center justify-center p-1.5" style={{height:68}}>
 <img src={p.img} alt={p.tag} className="h-full object-contain"/>
 </div>
 <div className="bg-[#FCFCFC] px-1.5 pb-1.5">
 <p className="text-[8px] text-[#9A9A9A] font-bold leading-tight">{p.sub}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* MAPA + BUSCAR */}
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-2">Ubica tu sucursal más cercana</p>
 <div className="bg-[#FCFCFC] border-2 border-[#E0E0E0] overflow-hidden">
 <div className="flex" style={{height:110}}>
 <div className="relative flex-1 cursor-pointer" onClick={() => openRadarWith(null)}>
 {loading && (
 <div className="absolute inset-0 bg-[#F9F9F9] flex items-center justify-center z-10">
 <div className="w-5 h-5 border-2 border-[#ED1C24] border-t-transparent rounded-full animate-spin"/>
 </div>
 )}
 <div ref={mapRef} className="w-full h-full" style={{pointerEvents:'none'}}/>
 <div className="absolute inset-0 z-10"/>
 </div>
 <div className="w-32 p-3 flex flex-col justify-between shrink-0 border-l-2 border-[#E0E0E0]">
 {selectedStore ? (
 <>
 <div>
 <p className="text-[9px] font-black uppercase text-[#9A9A9A] tracking-wide">Más cercana</p>
 <p className="text-xs font-black text-[#4F4F4F] leading-tight mt-0.5 line-clamp-2">{selectedStore.name}</p>
 <p className="text-[10px] font-black text-[#ED1C24] mt-0.5">{selectedStore.distanceLabel}</p>
 </div>
 <button onClick={() => openRadarWith(selectedStore)}
 className="w-full bg-[#ED1C24] text-white text-[10px] font-black py-1.5 uppercase tracking-wide">
 BUSCAR
 </button>
 </>
 ) : (
 <>
 <p className="text-xs font-black text-[#4F4F4F] leading-snug">Encuentra tu tienda</p>
 <button onClick={() => openRadarWith(null)}
 className="w-full bg-[#ED1C24] text-white text-[10px] font-black py-1.5 uppercase tracking-wide">
 BUSCAR
 </button>
 </>
 )}
 </div>
 </div>
 </div>
 </div>

 {/* SUCURSALES */}
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-2">Sucursales más visitadas</p>
 <div className="space-y-3">
 {nearbyStores.slice(0,3).map(s => (
 <div key={s.id} onClick={() => openRadarWith(s)}
 className="bg-[#FCFCFC] border-2 border-[#E0E0E0] p-3 cursor-pointer active:bg-[#F9F9F9]">
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-2">{s.name.toUpperCase()}</p>
 <div className="flex items-start gap-3">
 <div className="w-12 h-12 bg-[#F9F9F9] border-2 border-[#E0E0E0] flex items-center justify-center shrink-0">
 <img src="/logo.png" alt="3B" className="w-8 object-contain"/>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-xs font-bold text-[#4F4F4F] leading-snug">{s.address}</p>
 <p className="text-[10px] text-[#9A9A9A] font-bold mt-0.5">Tel: 1234-5678</p>
 </div>
 <div className="shrink-0 text-right flex flex-col items-end gap-2">
 <div>
 <p className="text-[9px] font-black text-[#9A9A9A] uppercase">Horario:</p>
 <p className="text-[10px] font-black text-[#4F4F4F]">{s.horario}</p>
 <p className="text-[10px] font-black text-[#ED1C24]">{s.distanceLabel}</p>
 </div>
 <button onClick={e=>{e.stopPropagation();openRadarWith(s);}}
 className="bg-[#ED1C24] text-white text-[9px] font-black px-2 py-1 uppercase tracking-wide flex items-center gap-1">
 NAVEGAR
 <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
 <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* MISIONES */}
 <div>
 <div className="flex items-center justify-between mb-2">
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Misiones del día</p>
 <button onClick={() => onTabChange('missions')} className="text-[10px] font-black text-[#ED1C24] uppercase tracking-wide">Ver todas</button>
 </div>
 {missions.slice(0,2).map(m => (
 <MissionCard key={m.id} mission={m} completed={isCompleted(m.id)}
 onComplete={() => handleComplete(m)} showHint={false}/>
 ))}
 </div>
 </div>

 {toast && (
 <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#4F4F4F] text-white px-5 py-3 font-black text-xs z-50 whitespace-nowrap uppercase tracking-wide shadow-xl">
 {toast}
 </div>
 )}
 </div>
 );
}
