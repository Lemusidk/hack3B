import { useState } from 'react';
import SplashScreen from './SplashScreen.jsx';
import LoginScreen  from './LoginScreen.jsx';
import MainShell    from './MainShell.jsx';
import { useGameState } from '../hooks/useGameState.js';
import { useLocation  } from '../hooks/useLocation.js';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const game     = useGameState();
  const location = useLocation();

  if (screen === 'splash') return <SplashScreen onContinue={() => setScreen('login')} />;
  if (screen === 'login')  return <LoginScreen  onLogin={()   => setScreen('app')}   />;
  return <MainShell game={game} location={location} />;
}
