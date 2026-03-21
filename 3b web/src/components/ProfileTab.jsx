import { LEVELS } from '../data/missions.js';

function IconStar()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="#ED1C24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>; }
function IconXP()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#F59E0B"/></svg>; }
function IconFire()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2c0 0-6 6-6 11a6 6 0 0012 0c0-5-6-11-6-11z" fill="#F59E0B"/></svg>; }
function IconToday() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#22C55E" strokeWidth="2"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/></svg>; }
function IconCheck() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconUser()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="white"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>; }

export default function ProfileTab({ game }) {
  const { points, xp, streak, missions, isCompleted, getLevel, history } = game;
  const level      = getLevel();
  const nextLevel  = LEVELS.find(l => l.level === level.level + 1);
  const xpInLevel  = xp - level.minXp;
  const xpNeeded   = (nextLevel?.minXp || level.maxXp) - level.minXp;
  const progress   = Math.min(xpInLevel / xpNeeded, 1);
  const doneToday  = missions.filter(m => isCompleted(m.id)).length;
  const userName   = localStorage.getItem('3bq_name') || 'Explorador';

  return (
    <div className="flex flex-col min-h-full bg-[#F9F9F9] w-full">

      {/* Header */}
      <div className="bg-[#ED1C24] pt-12 pb-5 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <img src="/logo.png" alt="3B" className="h-8 object-contain mb-3"/>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 flex items-center justify-center shrink-0">
              <IconUser />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Tu perfil</p>
              <p className="text-white font-black text-xl leading-tight truncate">{userName}</p>
              <p className="text-white/80 text-sm font-bold">Nivel {level.level} — {level.name}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-white/60 font-bold mb-1">
              <span>Progreso al siguiente nivel</span>
              <span>{xpInLevel} / {xpNeeded} XP</span>
            </div>
            <div className="w-full h-2 bg-white/20">
              <div className="h-full bg-white transition-all duration-700" style={{width:`${progress*100}%`}}/>
            </div>
            {nextLevel && <p className="text-white/40 text-[9px] font-bold mt-1">Siguiente: {nextLevel.name}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 pt-4 pb-8 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { Icon:IconStar,  val:points,    label:'Puntos', color:'#ED1C24' },
            { Icon:IconXP,    val:xp,        label:'XP',     color:'#F59E0B' },
            { Icon:IconFire,  val:streak,    label:'Racha',  color:'#F59E0B' },
            { Icon:IconToday, val:doneToday, label:'Hoy',    color:'#22C55E' },
          ].map(({ Icon, val, label, color }) => (
            <div key={label} className="bg-white border-2 border-[#E0E0E0] p-2 text-center">
              <div className="flex justify-center mb-1"><Icon /></div>
              <p className="text-lg font-black leading-none" style={{color}}>{val}</p>
              <p className="text-[8px] font-black text-[#9A9A9A] uppercase tracking-wide mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Levels */}
        <div className="bg-white border-2 border-[#E0E0E0]">
          <div className="px-4 py-3 border-b-2 border-[#E0E0E0]">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Niveles 3B Quest</p>
          </div>
          {LEVELS.map((lv, i) => {
            const isActive = lv.level === level.level;
            const isDone   = lv.level < level.level;
            return (
              <div key={lv.level}
                className={`flex items-center gap-3 px-4 py-3 ${i < LEVELS.length-1 ? 'border-b border-[#E0E0E0]' : ''} ${isActive ? 'bg-[#FDE4E5]' : ''}`}>
                <div className={`w-6 h-6 flex items-center justify-center shrink-0 text-[10px] font-black ${isActive ? 'bg-[#ED1C24] text-white' : isDone ? 'bg-[#22C55E]' : 'bg-[#E0E0E0] text-[#9A9A9A]'}`}>
                  {isDone ? <IconCheck /> : lv.level}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-black ${isActive ? 'text-[#ED1C24]' : isDone ? 'text-[#9A9A9A]' : 'text-[#4F4F4F]'}`}>{lv.name}</p>
                  <p className="text-[9px] text-[#9A9A9A] font-bold">{lv.minXp} – {lv.maxXp} XP</p>
                </div>
                {isActive && <span className="bg-[#ED1C24] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wide">Actual</span>}
              </div>
            );
          })}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white border-2 border-[#E0E0E0]">
            <div className="px-4 py-3 border-b-2 border-[#E0E0E0]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Historial de misiones</p>
            </div>
            {history.slice(0,8).map((h, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-2.5 ${i < Math.min(history.length,8)-1 ? 'border-b border-[#E0E0E0]' : ''}`}>
                <div className="w-6 h-6 bg-[#FDE4E5] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#4F4F4F] truncate">{h.title}</p>
                  <p className="text-[9px] text-[#9A9A9A] font-bold">{new Date(h.date).toLocaleDateString('es-MX')}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-[#ED1C24]">+{h.pts} pts</p>
                  <p className="text-[9px] text-[#9A9A9A] font-bold">+{h.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#FDE4E5] border-2 border-[#F9BDBF] p-4 flex items-center gap-3">
          <img src="/logo.png" alt="3B" className="h-8 object-contain shrink-0"/>
          <div>
            <p className="font-black text-sm text-[#4F4F4F]">Tiendas 3B</p>
            <p className="text-xs text-[#9A9A9A] font-bold">3,346 tiendas · 19 estados · Desde 2005</p>
          </div>
        </div>
      </div>
    </div>
  );
}
