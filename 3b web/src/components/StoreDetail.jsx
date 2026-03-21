import { useEffect, useRef, useState } from 'react';

export default function StoreDetail({ store, userPos, onBack }) {
 const mapRef = useRef(null);
 const mapObj = useRef(null);
 const routeRef = useRef(null);
 const [routing, setRouting] = useState(false); // recorrido activo
 const [routeInfo, setRouteInfo] = useState(null); // { distance, duration }

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
 center: [store.lat, store.lng], zoom: 15,
 zoomControl: true, attributionControl: false,
 dragging: true, scrollWheelZoom: false,
 });
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

 // ── Store marker ─────────────────────────────────
 L.marker([store.lat, store.lng], {
 icon: L.divIcon({
 className: '',
 html: `<div style="width:40px;height:40px;background:#ED1C24;color:white;border:3px solid white;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:10px;font-family:sans-serif;box-shadow:0 3px 10px rgba(237,28,36,0.4)">3B</div>`,
 iconSize: [40,40], iconAnchor: [20,20]
 })
 }).addTo(map);

 // ── User marker — mascota corriendo ──────────────
 if (userPos) {
 const userIcon = L.divIcon({
 className: '',
 html: `<img src="/mascota_corriendo.png" style="width:52px;height:52px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>`,
 iconSize: [52,52], iconAnchor: [26,48],
 });
 L.marker([userPos.lat, userPos.lng], { icon: userIcon }).addTo(map);

 // Dashed preview line
 routeRef.current = L.polyline(
 [[userPos.lat, userPos.lng], [store.lat, store.lng]],
 { color:'#ED1C24', weight:3, opacity:0.45, dashArray:'8 5' }
 ).addTo(map);

 map.fitBounds(
 [[userPos.lat, userPos.lng], [store.lat, store.lng]],
 { padding: [40, 40] }
 );
 }

 mapObj.current = map;
 });

 return () => {
 if (mapObj.current) { mapObj.current.remove(); mapObj.current = null; }
 };
 }, [store.id]);

 // ── Iniciar recorrido — fetch ruta real de OSRM ───────
 async function startRoute() {
 if (!userPos || !mapObj.current) return;
 setRouting(true);

 try {
 const url = `https://router.project-osrm.org/route/v1/driving/`
 + `${userPos.lng},${userPos.lat};${store.lng},${store.lat}`
 + `?overview=full&geometries=geojson`;

 const res = await fetch(url);
 const data = await res.json();
 const route = data.routes?.[0];

 if (!route) throw new Error('sin ruta');

 const coords = route.geometry.coordinates.map(([lng,lat]) => [lat,lng]);
 const distKm = (route.distance / 1000).toFixed(1);
 const mins = Math.ceil(route.duration / 60);

 import('leaflet').then(L => {
 const map = mapObj.current;

 // Remove old preview line
 if (routeRef.current) { routeRef.current.remove(); routeRef.current = null; }

 // Draw real route — solid red
 routeRef.current = L.polyline(coords, {
 color: '#ED1C24', weight: 5, opacity: 0.85,
 }).addTo(map);

 map.fitBounds(routeRef.current.getBounds(), { padding: [40, 40] });
 });

 setRouteInfo({ distance: `${distKm} km`, duration: `${mins} min` });
 } catch {
 // fallback: straight line already shown
 const mins = Math.ceil(store.distanceKm * 3);
 setRouteInfo({ distance: store.distanceLabel, duration: `~${mins} min` });
 }
 }

 const mins = userPos ? Math.ceil(store.distanceKm * 3) : null;

 return (
 <div className="flex flex-col min-h-full bg-white">

 {/* Header */}
 <div className="bg-[#ED1C24] pt-12 pb-3 flex items-center gap-3 flex-shrink-0 px-4 sm:px-8">
 <button onClick={onBack} className="text-white p-1">
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
 <path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </button>
 <p className="text-white font-black text-base uppercase tracking-wide truncate flex-1">{store.name}</p>
 </div>

 {/* Map */}
 <div ref={mapRef} style={{ height:'44vh' }} className="flex-shrink-0"/>

 {/* Route info bar — shown after routing */}
 {routeInfo && (
 <div className="bg-[#ED1C24] px-5 py-2 flex items-center gap-4 flex-shrink-0">
 <div className="flex items-center gap-2 text-white">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
 <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
 <path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
 </svg>
 <span className="font-black text-sm">{routeInfo.duration}</span>
 </div>
 <div className="flex items-center gap-2 text-white">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
 <path d="M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
 <circle cx="19" cy="12" r="2" fill="white"/>
 <circle cx="5" cy="12" r="2" fill="white"/>
 </svg>
 <span className="font-black text-sm">{routeInfo.distance}</span>
 </div>
 <span className="text-white/70 text-xs font-bold ml-auto">Ruta activa</span>
 </div>
 )}

 {/* Store info */}
 <div className="px-4 sm:px-8 pt-4 pb-4 space-y-3 flex-1 max-w-4xl mx-auto w-full">
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-0.5">Dirección</p>
 <p className="text-base font-bold text-[#4F4F4F]">{store.address}</p>
 </div>

 <div className="flex gap-8">
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-0.5">Horario</p>
 <p className="text-sm font-bold text-[#4F4F4F]">{store.horario}</p>
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-0.5">Distancia</p>
 <p className="text-sm font-black text-[#ED1C24]">{store.distanceLabel}</p>
 </div>
 </div>

 <div className="bg-[#FDE4E5] border-l-4 border-[#ED1C24] px-4 py-2">
 <p className="text-xs font-black text-[#ED1C24] uppercase tracking-widest">
 Colonia {store.colonia}
 </p>
 </div>

 {/* Ruta más rápida card */}
 <div className="bg-[#4F4F4F] p-4 flex items-center justify-between">
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-0.5">Ruta más rápida</p>
 <p className="text-white font-black text-sm">
 {routeInfo
 ? `${routeInfo.duration} en auto`
 : mins
 ? `Aproximadamente ${mins} min en auto`
 : 'Activa tu ubicación para la ruta'
 }
 </p>
 <p className="text-[#9A9A9A] text-xs font-bold mt-0.5">
 {routeInfo ? routeInfo.distance : store.distanceLabel} desde tu ubicación
 </p>
 </div>
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
 <path d="M12 2L8 8H4l4 6H5l7 8 7-8h-3l4-6h-4L12 2z" fill="#ED1C24"/>
 </svg>
 </div>

 {/* ── INICIAR RECORRIDO button ───────────────── */}
 {userPos && (
 <button
 onClick={startRoute}
 disabled={routing && !!routeInfo}
 className={`w-full py-4 font-black text-base uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
 routeInfo
 ? 'bg-[#E0E0E0] text-[#9A9A9A] cursor-default'
 : 'bg-[#ED1C24] text-white active:opacity-80'
 }`}
 >
 {routing && !routeInfo ? (
 <>
 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
 Calculando ruta...
 </>
 ) : routeInfo ? (
 <>
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
 <path d="M5 13l4 4L19 7" stroke="#9A9A9A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 Recorrido iniciado
 </>
 ) : (
 <>
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
 <path d="M12 2L8 8H4l4 6H5l7 8 7-8h-3l4-6h-4L12 2z" fill="white"/>
 </svg>
 Iniciar recorrido
 </>
 )}
 </button>
 )}
 </div>
 </div>
 );
}
