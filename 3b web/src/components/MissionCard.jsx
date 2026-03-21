import { useState } from 'react';

export default function MissionCard({ mission, completed, onComplete, showHint = true }) {
  const [hintOpen, setHintOpen] = useState(false);
  const [pressing, setPressing] = useState(false);

  return (
    <div className={`mb-3 rounded-2xl border transition-all duration-200 overflow-hidden ${
      completed
        ? 'bg-neutral-100 border-green-200'
        : 'bg-white border-neutral-200 shadow-sm'
    }`}>
      <div className="p-4">
        <div className="flex gap-3">
          {/* Emoji / Check */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            completed ? 'bg-green-50' : 'bg-opacity-10'
          }`}
            style={{ background: completed ? '' : `${mission.color}18` }}
          >
            {completed
              ? <span className="text-2xl">✅</span>
              : <span className="text-2xl">{mission.emoji}</span>
            }
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${mission.color}15`, color: mission.color }}>
                {mission.category}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                completed ? 'bg-green-50 text-green-600' : 'bg-brand-red-surface text-brand-red'
              }`}>
                +{mission.pts} pts
              </span>
            </div>
            <p className={`text-sm font-bold leading-tight ${
              completed ? 'text-neutral-400 line-through' : 'text-gray-900'
            }`}>
              {mission.title}
            </p>
            <p className={`text-xs mt-0.5 ${completed ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {mission.description}
            </p>

            {/* Hint toggle */}
            {showHint && !completed && (
              <div className="mt-2">
                <button
                  onClick={() => setHintOpen(h => !h)}
                  className="flex items-center gap-1 text-xs font-semibold text-amber-500"
                >
                  <span>{hintOpen ? '💡' : '🔍'}</span>
                  {hintOpen ? 'Ocultar pista' : 'Ver pista'}
                </button>
                {hintOpen && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-neutral-700 animate-fade-up">
                    💡 {mission.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complete button */}
      {!completed && onComplete && (
        <div className="px-4 pb-4">
          <button
            onMouseDown={() => setPressing(true)}
            onMouseUp={() => setPressing(false)}
            onTouchStart={() => setPressing(true)}
            onTouchEnd={() => setPressing(false)}
            onClick={onComplete}
            className={`w-full py-3 rounded-xl bg-brand-red text-white font-bold text-sm transition-transform duration-150 ${
              pressing ? 'scale-95' : 'scale-100'
            }`}
          >
            ¡Misión completada! ✓
          </button>
        </div>
      )}

      {completed && (
        <div className="pb-3 flex justify-center">
          <span className="text-green-500 text-xs font-semibold flex items-center gap-1">
            ✅ Completada
          </span>
        </div>
      )}
    </div>
  );
}
