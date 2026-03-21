export default function ProfileTab({ game }) {
  const { points, streak, missions, isCompleted, getLevel } = game;
  const level = getLevel();
  const progress = Math.min(points / level.next, 1);
  const completedToday = missions.filter(m => isCompleted(m.id)).length;

  const levels = [
    { emoji:'🌱', name:'Explorador', range:'0 – 199 pts',   active: points < 200 },
    { emoji:'🔥', name:'Cazador',    range:'200 – 499 pts', active: points >= 200 && points < 500 },
    { emoji:'⚡', name:'Maestro',    range:'500 – 999 pts', active: points >= 500 && points < 1000 },
    { emoji:'👑', name:'Leyenda 3B', range:'1000+ pts',     active: points >= 1000 },
  ];

  return (
    <div className="pb-8">
      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <h1 className="text-xl font-extrabold text-gray-900">👤 Perfil</h1>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* ── HERO CARD ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-full mx-auto flex items-center justify-center text-4xl mb-3">
            {level.emoji}
          </div>
          <p className="text-xl font-extrabold text-gray-900">Cazador 3B</p>
          <p className="text-brand-red font-semibold text-sm mb-4">{level.name}</p>

          {/* Progress bar */}
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Progreso al siguiente nivel</span>
            <span className="text-brand-red font-bold">{points} / {level.next} pts</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red rounded-full transition-all duration-700"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji:'⭐', val: points,         label:'Puntos',   color:'#F59E0B' },
            { emoji:'🔥', val: streak,         label:'Racha',    color:'#FF6B35' },
            { emoji:'✅', val: completedToday, label:'Hoy',      color:'#22C55E' },
          ].map(({ emoji, val, label, color }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center"
              style={{ background: `${color}12` }}>
              <p className="text-2xl mb-1">{emoji}</p>
              <p className="text-xl font-extrabold" style={{ color }}>{val}</p>
              <p className="text-[11px] text-neutral-500">{label}</p>
            </div>
          ))}
        </div>

        {/* ── LEVELS ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4">
          <p className="font-bold text-sm text-gray-900 mb-3">Niveles 3B Quest</p>
          <div className="space-y-2">
            {levels.map(lv => (
              <div key={lv.name}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  lv.active ? 'bg-brand-red-surface border border-red-200' : 'bg-neutral-100'
                }`}
              >
                <span className="text-xl">{lv.emoji}</span>
                <div className="flex-1">
                  <p className={`text-sm font-${lv.active ? 'bold' : 'medium'} ${lv.active ? 'text-brand-red' : 'text-neutral-700'}`}>
                    {lv.name}
                  </p>
                  <p className="text-xs text-neutral-400">{lv.range}</p>
                </div>
                {lv.active && (
                  <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Tú
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 3B INFO ─────────────────────────────────────── */}
        <div className="bg-brand-red-surface border border-red-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center text-white font-extrabold text-base shrink-0">
            3B
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">Tiendas 3B</p>
            <p className="text-xs text-neutral-500">3,346 tiendas · 19 estados · Desde 2005</p>
            <p className="text-xs text-brand-red font-medium mt-0.5">Precios bajos, siempre.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
