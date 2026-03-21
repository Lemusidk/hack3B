import { useState, useEffect } from 'react';
import { stores, distanceTo, distanceLabel } from '../data/stores.js';

// CDMX center fallback for demo
const FALLBACK = { lat: 19.4326, lng: -99.1332 };

export function useLocation() {
  const [userPos,       setUserPos]       = useState(null);
  const [nearbyStores,  setNearbyStores]  = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      applyPosition(FALLBACK.lat, FALLBACK.lng);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => applyPosition(pos.coords.latitude, pos.coords.longitude),
      ()    => applyPosition(FALLBACK.lat, FALLBACK.lng),
      { timeout: 6000, maximumAge: 60000 }
    );
  }, []);

  function applyPosition(lat, lng) {
    setUserPos({ lat, lng });
    const withDist = stores
      .map(s => ({ ...s, distanceKm: distanceTo(lat, lng, s.lat, s.lng), distanceLabel: '' }))
      .map(s => ({ ...s, distanceLabel: distanceLabel(s.distanceKm) }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
    setNearbyStores(withDist);
    setSelectedStore(withDist[0] || null);
    setLoading(false);
  }

  return { userPos, nearbyStores, selectedStore, setSelectedStore, loading, error };
}
