import { useState } from 'react';
import HomeTab from './HomeTab.jsx';
import MissionsTab from './MissionsTab.jsx';
import CatalogTab from './CatalogTab.jsx';
import ProfileTab from './ProfileTab.jsx';
import RadarTab from './RadarTab.jsx';
import StoreDetail from './StoreDetail.jsx';

const TABS = [
 { id:'home', label:'Inicio' },
 { id:'catalog', label:'Catálogo' },
 { id:'missions', label:'Misiones' },
 { id:'profile', label:'Perfil' },
];

export default function MainShell({ game, location }) {
 const [active, setActive] = useState('home');
 const [detailStore, setDetailStore] = useState(null);

 function goRadar(store) {
 if (store) location.setSelectedStore(store);
 setActive('radar');
 }
 function goStoreDetail(store) { setDetailStore(store); setActive('store'); }
 function goBack() {
 if (active === 'store') { setActive('radar'); setDetailStore(null); }
 else setActive('home');
 }

 const isFullscreen = active === 'radar' || active === 'store';

 return (
 <div className="flex flex-col w-full h-screen bg-[#F9F9F9]">
 <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">

 {active === 'home' && <HomeTab game={game} location={location} onTabChange={setActive} onOpenRadar={goRadar} />}
 {active === 'catalog' && <CatalogTab />}
 {active === 'missions' && <MissionsTab game={game} />}
 {active === 'profile' && <ProfileTab game={game} />}

 {active === 'radar' && (
 <div className="flex flex-col h-full">
 <div className="bg-[#ED1C24] pt-12 pb-3 flex items-center gap-3 flex-shrink-0 px-4 sm:px-8">
 <button onClick={goBack} className="text-white p-1">
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
 <path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </button>
 <p className="text-white font-black text-base uppercase tracking-wide flex-1">Radar 3B</p>
 <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 uppercase">
 {location.nearbyStores.length} tiendas
 </span>
 </div>
 <div className="flex-1 overflow-hidden">
 <RadarTab location={location} onSelectStore={goStoreDetail} />
 </div>
 </div>
 )}

 {active === 'store' && detailStore && (
 <StoreDetail store={detailStore} userPos={location.userPos} onBack={goBack} />
 )}
 </div>

 {/* Bottom nav — hidden in fullscreen pages */}
 {!isFullscreen && (
 <nav className="bg-white border-t-2 border-[#E0E0E0] flex-shrink-0 safe-bottom">
 <div className="flex h-16 max-w-4xl mx-auto">
 {TABS.map(({ id, label }) => {
 const on = active === id;
 return (
 <button key={id} onClick={() => setActive(id)}
 className={`flex-1 flex flex-col items-center justify-center gap-0.5 border-t-2 transition-colors relative ${on ? 'border-[#ED1C24]' : 'border-transparent'}`}>
 <TabIcon id={id} active={on} />
 <span className={`text-[10px] font-black uppercase tracking-wide ${on ? 'text-[#ED1C24]' : 'text-[#9A9A9A]'}`}>{label}</span>
 </button>
 );
 })}
 </div>
 </nav>
 )}
 </div>
 );
}

function TabIcon({ id, active }) {
 const c = active ? '#ED1C24' : '#9A9A9A';
 if (id === 'home') return (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
 <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill={active?c:'none'} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
 <path d="M9 21V12h6v9" stroke={active?'#fff':c} strokeWidth="2" strokeLinecap="round"/>
 </svg>
 );
 if (id === 'catalog') return (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
 <rect x="3" y="3" width="7" height="7" rx="1" fill={active?c:'none'} stroke={c} strokeWidth="2"/>
 <rect x="14" y="3" width="7" height="7" rx="1" fill={active?c:'none'} stroke={c} strokeWidth="2"/>
 <rect x="3" y="14" width="7" height="7" rx="1" fill={active?c:'none'} stroke={c} strokeWidth="2"/>
 <rect x="14" y="14" width="7" height="7" rx="1" fill={active?c:'none'} stroke={c} strokeWidth="2"/>
 </svg>
 );
 if (id === 'missions') return (
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
 <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill={active?c:'none'} stroke={c} strokeWidth="2" strokeLinejoin="round"/>
 </svg>
 );
 // profile
 return (
 <div className="relative">
 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
 <circle cx="12" cy="8" r="4" fill={active?c:'none'} stroke={c} strokeWidth="2"/>
 <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="2" strokeLinecap="round"/>
 </svg>
 
 </div>
 );
}
