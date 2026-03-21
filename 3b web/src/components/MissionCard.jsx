import { useState } from 'react';

const CATEGORY_COLORS = {
  'Coleccion':      '#9B59B6',
  'Colección':      '#9B59B6',
  'Ahorro':         '#ED1C24',
  'Descubrimiento': '#2980B9',
  'Social':         '#27AE60',
};

function IconCheck() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconHint() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
}
function IconChevron({ open }) {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d={open?"M18 15l-6-6-6 6":"M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function MissionCard({ mission, completed, onComplete, showHint = true }) {
  const [hintOpen, setHintOpen] = useState(false);
  const color = CATEGORY_COLORS[mission.category] || '#ED1C24';

  return (
    <div className={`mb-3 border-2 bg-white ${completed ? 'border-[#E0E0E0] opacity-60' : 'border-[#E0E0E0]'}`}>
      <div className="p-3 flex gap-3 items-start">

        {/* Left color square */}
        <div className="w-11 h-11 flex items-center justify-center shrink-0"
          style={{ background: completed ? '#E0E0E0' : color }}>
          {completed
            ? <IconCheck />
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
          }
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[9px] font-black uppercase tracking-widest"
              style={{ color: completed ? '#9A9A9A' : color }}>
              {mission.category}
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 shrink-0"
              style={{
                background: completed ? '#F9F9F9' : '#FDE4E5',
                color: completed ? '#9A9A9A' : '#ED1C24'
              }}>
              +{mission.pts} pts · +{mission.xp} XP
            </span>
          </div>

          <p className={`text-sm font-black leading-snug ${completed ? 'text-[#9A9A9A] line-through' : 'text-[#4F4F4F]'}`}>
            {mission.title}
          </p>
          <p className="text-xs text-[#9A9A9A] font-medium mt-0.5 leading-snug">
            {mission.description}
          </p>

          {/* Hint toggle */}
          {showHint && !completed && (
            <div className="mt-2">
              <button onClick={() => setHintOpen(h => !h)}
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#ED1C24]">
                <IconHint />
                <span>{hintOpen ? 'Ocultar pista' : 'Ver pista'}</span>
                <IconChevron open={hintOpen} />
              </button>
              {hintOpen && (
                <div className="mt-1.5 border-l-4 border-[#ED1C24] bg-[#FDE4E5] px-3 py-2 text-xs font-bold text-[#C3171E]">
                  {mission.hint}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action row */}
      {!completed && onComplete && (
        <div className="px-3 pb-3">
          <button onClick={onComplete}
            className="w-full py-2.5 border-2 border-[#ED1C24] text-[#ED1C24] font-black text-xs uppercase tracking-widest hover:bg-[#ED1C24] hover:text-white transition-colors active:opacity-80 flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Marcar como completada
          </button>
        </div>
      )}
      {completed && (
        <div className="px-3 pb-3">
          <div className="w-full py-2 bg-[#F9F9F9] text-center flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#22C55E] font-black text-xs uppercase tracking-widest">Completada</span>
          </div>
        </div>
      )}
    </div>
  );
}
