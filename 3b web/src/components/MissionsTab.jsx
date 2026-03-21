import { useState, useEffect } from 'react';
import MissionCard from './MissionCard.jsx';

export default function MissionsTab({ game }) {
  const { missions, points, isCompleted, completeMission } = game;
  const completedCount = missions.filter(m => isCompleted(m.id)).length;
  const allDone = completedCount === missions.length && missions.length > 0;
  const [confetti, setConfetti] = useState([]);

  function handleComplete(mission) {
    completeMission(mission);
    launchConfetti();
  }

  function launchConfetti() {
    const pieces = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#ED1C24','#F59E0B','#22C55E','#3B82F6','#A855F7'][i % 5],
      delay: Math.random() * 0.4,
      size: 6 + Math.random() * 6,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2500);
  }

  return (
    <div className="pb-4">
      {/* Confetti overlay */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map(p => (
            <div
              key={p.id}
              className="absolute rounded-sm"
              style={{
                left: `${p.x}%`,
                top: '-10px',
                width: p.size,
                height: p.size,
                background: p.color,
                animation: `confettiFall 2s ease-in ${p.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── HEADER ────────────────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <h1 className="text-xl font-extrabold text-gray-900 mb-3">⚡ Misiones</h1>

        {/* Summary card */}
        <div className={`rounded-2xl p-4 text-white ${
          allDone
            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
            : 'bg-gradient-to-r from-brand-red to-brand-red-dark'
        }`}>
          <p className="text-xs text-white/70 font-medium mb-1">
            {allDone ? '🏆 ¡Todo completado!' : '⚡ Progreso de hoy'}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold">{completedCount} de {missions.length}</p>
            <div className="bg-white/20 rounded-full px-3 py-1.5 text-center">
              <p className="text-lg font-extrabold leading-none">{points}</p>
              <p className="text-[10px] text-white/70">pts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* All done banner */}
        {allDone && (
          <div className="mb-3 bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-sm text-green-700">¡Misiones del día completadas!</p>
              <p className="text-xs text-neutral-500">Vuelve mañana para nuevas misiones</p>
            </div>
          </div>
        )}

        {/* Mission cards */}
        {missions.map(m => (
          <MissionCard
            key={m.id}
            mission={m}
            completed={isCompleted(m.id)}
            onComplete={() => handleComplete(m)}
            showHint={true}
          />
        ))}

        {/* How it works */}
        <div className="bg-white rounded-2xl p-4 mt-2">
          <p className="font-bold text-sm text-gray-900 mb-3">¿Cómo funciona?</p>
          {[
            ['⚡', 'Cada día tienes 3 misiones nuevas que desbloquear'],
            ['🏪', 'Ve a tu Tienda 3B más cercana y completa el reto'],
            ['⭐', 'Acumula puntos, mantén tu racha y sube de nivel'],
            ['🔥', 'Las misiones rotan cada día — siempre hay algo nuevo'],
          ].map(([emoji, text], i) => (
            <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
              <div className="w-6 h-6 bg-brand-red rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                {i+1}
              </div>
              <span className="text-base">{emoji}</span>
              <p className="text-xs text-neutral-600 flex-1">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
