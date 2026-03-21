import { useState } from 'react';
import MissionCard from './MissionCard.jsx';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return '¡Buenos días! ☀️';
  if (h < 18) return '¡Buenas tardes! 🌤️';
  return '¡Buenas noches! 🌙';
}

function todayLabel() {
  return new Date().toLocaleDateString('es-MX', {
    weekday:'long', day:'numeric', month:'long'
  });
}

export default function HomeTab({ game, location, onTabChange }) {
  const { missions, points, streak, isCompleted, completeMission } = game;
  const { selectedStore, loading: locLoading } = location;
  const [toast, setToast] = useState(null);
  const completedCount = missions.filter(m => isCompleted(m.id)).length;
  const progress = missions.length ? completedCount / missions.length : 0;

  function handleComplete(mission) {
    completeMission(mission);
    setToast(`+${mission.pts} pts ¡Misión completada! 🎉`);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="pb-4">
      {/* ── HEADER ────────────────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-neutral-500 font-medium">{greeting()}</p>
            <h1 className="text-xl font-extrabold text-gray-900 leading-tight">¡Tu misión te espera!</h1>
          </div>
          <button
            onClick={() => onTabChange('profile')}
            className="bg-brand-red-surface text-brand-red font-bold text-sm px-3 py-2 rounded-xl flex items-center gap-1"
          >
            <span>⭐</span>
            <span>{points} pts</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>{todayLabel()}</span>
          <span className="text-brand-red font-semibold">{completedCount}/{missions.length} misiones</span>
        </div>
        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-red rounded-full transition-all duration-700"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* ── STORE BANNER ──────────────────────────────────── */}
        <div
          className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-neutral-200 cursor-pointer active:scale-95 transition-transform"
          onClick={() => onTabChange('radar')}
        >
          <div className="w-11 h-11 bg-brand-red rounded-xl flex items-center justify-center text-white font-extrabold text-base shrink-0">
            3B
          </div>
          {locLoading ? (
            <div className="flex-1">
              <p className="text-xs text-neutral-400 animate-pulse">Buscando tienda más cercana…</p>
            </div>
          ) : selectedStore ? (
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-neutral-400">Tu tienda más cercana</p>
              <p className="font-bold text-sm text-gray-900 truncate">{selectedStore.name}</p>
              <p className="text-xs text-neutral-500">📍 {selectedStore.distanceLabel} · {selectedStore.horario}</p>
            </div>
          ) : null}
          <div className="text-brand-red text-lg">›</div>
        </div>

        {/* ── STREAK ────────────────────────────────────────── */}
        {streak > 0 && (
          <div className="rounded-2xl p-3 flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="font-bold text-sm">{streak} días seguidos</p>
              <p className="text-xs text-white/75">¡No pierdas tu racha!</p>
            </div>
          </div>
        )}

        {/* ── MISSIONS ──────────────────────────────────────── */}
        <div>
          <p className="text-sm font-bold text-gray-900 mb-2 px-1">⚡ Misiones del día</p>
          {missions.map(m => (
            <MissionCard
              key={m.id}
              mission={m}
              completed={isCompleted(m.id)}
              onComplete={() => handleComplete(m)}
              showHint={false}
            />
          ))}
        </div>
      </div>

      {/* ── TOAST ─────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm animate-bounce-in z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
