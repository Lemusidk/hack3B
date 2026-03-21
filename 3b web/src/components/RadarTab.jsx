import { useEffect, useRef, useState } from 'react';
import { useLocation } from '../hooks/useLocation.js';

export default function RadarTab({ location }) {
  const { userPos, nearbyStores, selectedStore, setSelectedStore, loading } = location;
  const mapRef     = useRef(null);
  const mapObjRef  = useRef(null);
  const markersRef = useRef([]);
  const userMarker = useRef(null);
  const lineRef    = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // Init Leaflet map (client-only)
  useEffect(() => {
    if (mapObjRef.current || !mapRef.current) return;
    import('leaflet').then(L => {
      // Fix default icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current, {
        center:          [19.4326, -99.1332],
        zoom:            12,
        zoomControl:     true,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      mapObjRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapObjRef.current) { mapObjRef.current.remove(); mapObjRef.current = null; }
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (!mapReady || !mapObjRef.current || nearbyStores.length === 0) return;
    import('leaflet').then(L => {
      const map = mapObjRef.current;

      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (userMarker.current) userMarker.current.remove();
      if (lineRef.current)    lineRef.current.remove();

      // User marker
      if (userPos) {
        const userIcon = L.divIcon({
          className: '',
          html: `<div style="width:18px;height:18px;background:#3B82F6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.3)"></div>`,
          iconSize: [18, 18], iconAnchor: [9, 9],
        });
        userMarker.current = L.marker([userPos.lat, userPos.lng], { icon: userIcon }).addTo(map);
        map.setView([userPos.lat, userPos.lng], 13);
      }

      // Store markers
      nearbyStores.forEach(store => {
        const isSel = selectedStore?.id === store.id;
        const icon  = L.divIcon({
          className: '',
          html: `<div style="
            width:${isSel?44:36}px;height:${isSel?44:36}px;
            background:${isSel?'#ED1C24':'white'};
            color:${isSel?'white':'#ED1C24'};
            border:2.5px solid #ED1C24;
            border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            font-weight:800;font-size:${isSel?13:11}px;
            box-shadow:0 2px 8px rgba(237,28,36,${isSel?0.4:0.2});
            font-family:Poppins,sans-serif;
            transition:all 0.2s;
          ">3B</div>`,
          iconSize:   [isSel?44:36, isSel?44:36],
          iconAnchor: [isSel?22:18, isSel?22:18],
        });
        const marker = L.marker([store.lat, store.lng], { icon })
          .addTo(map)
          .on('click', () => { setSelectedStore(store); map.setView([store.lat, store.lng], 15); });
        markersRef.current.push(marker);
      });

      // Dashed route line
      if (selectedStore && userPos) {
        lineRef.current = L.polyline(
          [[userPos.lat, userPos.lng], [selectedStore.lat, selectedStore.lng]],
          { color:'#ED1C24', weight:3, opacity:0.5, dashArray:'8 5' }
        ).addTo(map);
      }
    });
  }, [mapReady, nearbyStores, selectedStore, userPos]);

  function openMaps(store) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}&travelmode=driving`, '_blank');
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── HEADER ──────────────────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-3 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-gray-900">📡 Radar 3B</h1>
          <span className="bg-brand-red-surface text-brand-red text-xs font-bold px-3 py-1 rounded-full">
            {nearbyStores.length} tiendas
          </span>
        </div>
      </div>

      {/* ── MAP ─────────────────────────────────────────────── */}
      <div className="relative" style={{ height: '42vh' }}>
        {loading && (
          <div className="absolute inset-0 z-10 bg-neutral-100 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-3 border-brand-red border-t-transparent rounded-full animate-spin" />
            <p className="text-neutral-500 text-sm">Buscando tiendas…</p>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full z-0" />
      </div>

      {/* ── SELECTED STORE ──────────────────────────────────── */}
      {selectedStore && (
        <div className="mx-4 mt-3 bg-brand-red-surface border border-red-200 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0">
            3B
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-gray-900 truncate">{selectedStore.name}</p>
            <p className="text-xs text-neutral-500">
              📍 {selectedStore.distanceLabel} · {selectedStore.horario}
            </p>
          </div>
          <button
            onClick={() => openMaps(selectedStore)}
            className="bg-brand-red text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shrink-0"
          >
            <span>🧭</span> Ir
          </button>
        </div>
      )}

      {/* ── STORES LIST ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-2">
        {nearbyStores.map(store => {
          const isSel = selectedStore?.id === store.id;
          return (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                isSel
                  ? 'bg-brand-red-surface border-red-200'
                  : 'bg-white border-neutral-200'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isSel ? 'bg-brand-red' : 'bg-neutral-100'
              }`}>
                {isSel
                  ? <span className="text-white text-xs">🏪</span>
                  : <span className="text-neutral-500 text-xs font-bold">{store.id}</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isSel ? 'text-brand-red' : 'text-gray-900'}`}>{store.name}</p>
                <p className="text-xs text-neutral-500 truncate">{store.colonia}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${isSel ? 'text-brand-red' : 'text-neutral-700'}`}>{store.distanceLabel}</p>
                <p className="text-[10px] text-neutral-400">{store.horario}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
