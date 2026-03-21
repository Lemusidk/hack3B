import { useState } from 'react';
import RegisterScreen from './RegisterScreen.jsx';

export default function LoginScreen({ onLogin }) {
  const [user,     setUser]     = useState('');
  const [pass,     setPass]     = useState('');
  const [focusU,   setFocusU]   = useState(false);
  const [focusP,   setFocusP]   = useState(false);
  const [register, setRegister] = useState(false);
  const ok = user.trim().length > 0;

  if (register) {
    return <RegisterScreen onRegister={onLogin} onBack={() => setRegister(false)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* Red header */}
      <div className="bg-[#ED1C24] px-8 pt-14 pb-10 flex-shrink-0">
        <img src="/logo.png" alt="Tiendas 3B" className="h-10 object-contain mb-6" />
        <h1 className="text-3xl font-black text-white leading-tight">
          Nos alegra verte<br />de nuevo
        </h1>
        <p className="text-white/70 text-sm font-semibold mt-1">
          Inicia sesion para continuar
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col px-8 pt-8 pb-10 gap-4">
        <input
          type="text"
          value={user}
          placeholder="Usuario / Telefono"
          onFocus={() => setFocusU(true)}
          onBlur={() => setFocusU(false)}
          onChange={e => setUser(e.target.value)}
          className={`w-full border-2 px-4 py-4 text-sm text-[#4F4F4F] placeholder-[#9A9A9A] outline-none bg-white transition-colors ${focusU ? 'border-[#ED1C24]' : 'border-[#E0E0E0]'}`}
        />
        <input
          type="password"
          value={pass}
          placeholder="Contrasena"
          onFocus={() => setFocusP(true)}
          onBlur={() => setFocusP(false)}
          onChange={e => setPass(e.target.value)}
          className={`w-full border-2 px-4 py-4 text-sm text-[#4F4F4F] placeholder-[#9A9A9A] outline-none bg-white transition-colors ${focusP ? 'border-[#ED1C24]' : 'border-[#E0E0E0]'}`}
        />
        <div className="text-right">
          <button className="text-xs text-[#9A9A9A] font-bold">Olvide mi contrasena</button>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => { if (ok) { localStorage.setItem('3bq_name', user.trim()); onLogin(); } }}
          className={`w-full py-4 font-black text-sm text-white uppercase tracking-widest transition-opacity ${ok ? 'bg-[#ED1C24]' : 'bg-[#E0E0E0]'}`}>
          Iniciar sesion
        </button>

        {/* Register link */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <p className="text-xs text-[#9A9A9A] font-bold">No tienes cuenta?</p>
          <button onClick={() => setRegister(true)}
            className="text-xs font-black text-[#ED1C24] uppercase tracking-wide underline">
            Registrate aqui
          </button>
        </div>
      </div>
    </div>
  );
}