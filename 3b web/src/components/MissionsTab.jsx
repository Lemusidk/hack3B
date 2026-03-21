import { useState } from 'react';
import MissionCard from './MissionCard.jsx';
import { LEVELS } from '../data/missions.js';

function IconFire() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2c0 0-6 6-6 11a6 6 0 0012 0c0-5-6-11-6-11z" fill="#ED1C24"/><path d="M12 12c0 0-3 2-3 4a3 3 0 006 0c0-2-3-4-3-4z" fill="#F9BDBF"/></svg>;
}
function IconCheck() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconStar() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#ED1C24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}

export default function MissionsTab({ game }) {
  const { missions, points, xp, isCompleted, completeMission, getLevel, streak, history } = game;
  const done  = missions.filter(m => isCompleted(m.id)).length;
  const level = getLevel();
  const nextLevel  = LEVELS.find(l => l.level === level.level + 1);
  const xpInLevel  = xp - level.minXp;
  const xpNeeded   = (nextLevel?.minXp || level.maxXp) - level.minXp;
  const xpProgress = Math.min(xpInLevel / xpNeeded, 1);

  const [confetti, setConfetti] = useState([]);
  const [toast,    setToast]    = useState(null);

  function handleComplete(m) {
    completeMission(m);
    setToast({ title: m.title, pts: m.pts, xp: m.xp });
    setTimeout(() => setToast(null), 3000);
    setConfetti(Array.from({length:20}, (_, i) => ({
      id:i, x:Math.random()*100,
      color:['#ED1C24','#C3171E','#F16D71','#9A9A9A'][i%4],
      delay:Math.random()*0.3,
    })));
    setTimeout(() => setConfetti([]), 2500);
  }

  return (
    <div className="flex flex-col min-h-full bg-[#F9F9F9] w-full">
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map(p => (
            <div key={p.id} className="absolute w-2.5 h-2.5"
              style={{left:`${p.x}%`, top:'-10px', background:p.color,
                animation:`confettiFall 2s ease-in ${p.delay}s forwards`}}/>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#ED1C24] pt-12 pb-4 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <img src="/logo.png" alt="3B" className="h-7 object-contain mb-3"
            />
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">
                Nivel {level.level} — {level.name}
              </p>
              <p className="text-white font-black text-2xl leading-none mt-0.5">
                {done}/{missions.length}
                <span className="text-base font-bold ml-2">misiones hoy</span>
              </p>
            </div>
            <div className="bg-white px-3 py-2 text-center">
              <p className="text-[#ED1C24] font-black text-xl leading-none">{points.toLocaleString()}</p>
              <p className="text-[#9A9A9A] text-[9px] font-black uppercase tracking-wide">puntos</p>
            </div>
          </div>

          {/* XP bar */}
          <div>
            <div className="flex justify-between text-[9px] text-white/50 font-bold mb-1">
              <span>{xpInLevel} XP acumulado</span>
              <span>Faltan {xpNeeded - xpInLevel} XP para subir</span>
            </div>
            <div className="w-full h-2 bg-white/20">
              <div className="h-full bg-white transition-all duration-700"
                style={{width:`${xpProgress*100}%`}}/>
            </div>
            {nextLevel && (
              <p className="text-white/40 text-[9px] font-bold mt-1">
                Siguiente nivel: {nextLevel.name}
              </p>
            )}
          </div>

          {/* Dot progress */}
          <div className="flex gap-1 justify-center mt-3">
            {missions.map((m, i) => (
              <div key={i} className={`h-1.5 transition-all ${isCompleted(m.id) ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}/>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 pt-4 pb-8 space-y-4">

        {/* Streak */}
        {streak > 0 && (
          <div className="bg-[#4F4F4F] px-4 py-3 flex items-center gap-3">
            <IconFire />
            <div className="flex-1">
              <p className="text-white font-black text-sm">{streak} dias seguidos</p>
              <p className="text-[#9A9A9A] text-xs font-bold">Mantén tu racha</p>
            </div>
            <div className="bg-[#ED1C24] px-2 py-1">
              <p className="text-white text-[9px] font-black uppercase tracking-wide">Racha activa</p>
            </div>
          </div>
        )}

        {/* All done banner */}
        {done === missions.length && missions.length > 0 && (
          <div className="bg-white border-l-4 border-[#22C55E] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#22C55E] flex items-center justify-center shrink-0">
              <IconCheck />
            </div>
            <div>
              <p className="font-black text-sm text-[#22C55E]">Misiones del dia completadas</p>
              <p className="text-xs text-[#9A9A9A] font-bold">Vuelve manana para nuevas misiones</p>
            </div>
          </div>
        )}

        {/* Missions list */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-3">Misiones de hoy</p>
          {missions.map(m => (
            <MissionCard
              key={m.id}
              mission={m}
              completed={isCompleted(m.id)}
              onComplete={() => handleComplete(m)}
              showHint={true}
            />
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white border-2 border-[#E0E0E0]">
          <div className="px-4 py-3 border-b-2 border-[#E0E0E0]">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Como funciona</p>
          </div>
          {[
            '3 misiones nuevas cada dia — rotan automaticamente',
            'Ve a tu Tienda 3B mas cercana y completa el reto',
            'Gana puntos y XP — sube de nivel y desbloquea recompensas',
            'Mantén tu racha diaria para multiplicar beneficios',
          ].map((text, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < 3 ? 'border-b border-[#E0E0E0]' : ''}`}>
              <div className="w-6 h-6 bg-[#ED1C24] flex items-center justify-center text-white text-[10px] font-black shrink-0">{i+1}</div>
              <p className="text-xs font-bold text-[#4F4F4F]">{text}</p>
            </div>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white border-2 border-[#E0E0E0]">
            <div className="px-4 py-3 border-b-2 border-[#E0E0E0]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Ultimas misiones</p>
            </div>
            {history.slice(0,5).map((h, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-2.5 ${i < Math.min(history.length,5)-1 ? 'border-b border-[#E0E0E0]' : ''}`}>
                <div className="w-6 h-6 bg-[#FDE4E5] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="flex-1 text-xs font-black text-[#4F4F4F] truncate">{h.title}</p>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-[#ED1C24]">+{h.pts} pts</p>
                  <p className="text-[9px] text-[#9A9A9A] font-bold">+{h.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-[#4F4F4F] text-white px-5 py-3 shadow-xl border-l-4 border-[#ED1C24]" style={{minWidth:260}}>
            <p className="font-black text-[9px] uppercase tracking-widest text-[#9A9A9A] mb-1">Mision completada</p>
            <p className="font-black text-sm text-white">{toast.title}</p>
            <div className="flex gap-4 mt-1.5">
              <span className="text-[#ED1C24] font-black text-xs">+{toast.pts} puntos</span>
              <span className="text-[#F9BDBF] font-black text-xs">+{toast.xp} XP</span>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes confettiFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  );
}
