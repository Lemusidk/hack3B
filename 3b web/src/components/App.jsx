import { useState } from 'react';
import HomeTab     from './HomeTab.jsx';
import RadarTab    from './RadarTab.jsx';
import MissionsTab from './MissionsTab.jsx';
import ProfileTab  from './ProfileTab.jsx';
import { useGameState } from '../hooks/useGameState.js';
import { useLocation  } from '../hooks/useLocation.js';

const TABS = [
  { id:'home',     icon:'🏠', label:'Inicio'   },
  { id:'radar',    icon:'📡', label:'Radar'    },
  { id:'missions', icon:'⚡', label:'Misiones' },
  { id:'profile',  icon:'👤', label:'Perfil'   },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const game     = useGameState();
  const location = useLocation();

  if (!game.ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center animate-pulse">
          <div className="text-5xl mb-4">🎮</div>
          <p className="text-neutral-500 font-medium">Cargando 3B Quest…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-neutral-100 relative overflow-hidden">
      {/* ── CONTENT ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {activeTab === 'home'     && <HomeTab     game={game} location={location} onTabChange={setActiveTab} />}
        {activeTab === 'radar'    && <RadarTab    location={location} />}
        {activeTab === 'missions' && <MissionsTab game={game} />}
        {activeTab === 'profile'  && <ProfileTab  game={game} />}
      </div>

      {/* ── BOTTOM NAV ─────────────────────────────────────────── */}
      <nav className="bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] safe-bottom">
        <div className="flex">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-brand-red'
                  : 'text-neutral-500'
              }`}
            >
              <span className={`text-xl mb-0.5 transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : 'scale-100'}`}>
                {tab.icon}
              </span>
              <span className={`text-[11px] font-${activeTab === tab.id ? '600' : '400'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 rounded-full bg-brand-red mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
