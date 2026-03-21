import { useEffect, useState } from 'react';

export default function SplashScreen({ onContinue }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* Logo + tagline */}
      <div className={`px-8 pt-14 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <img src="/logo.png" alt="Tiendas 3B" className="h-10 object-contain" />
        <p className="text-[#ED1C24] text-sm font-bold underline mt-3">"Tu despensa inteligente"</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Mascota pegada al botón */}
      <div className={`flex justify-center transition-all duration-700 delay-150 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <img src="/mascota.png" alt="Mascota 3B" className="object-contain object-bottom"
          style={{ height: '52vh', maxWidth: '90%' }} />
      </div>

      {/* Botón */}
      <div className={`px-8 pb-14 transition-all duration-500 delay-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={onContinue}
          className="w-full bg-[#ED1C24] text-white font-black text-base py-4 active:opacity-80 transition-opacity">
          Entrar
        </button>
      </div>
    </div>
  );
}