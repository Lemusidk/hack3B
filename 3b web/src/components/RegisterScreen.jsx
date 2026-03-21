import { useState } from 'react';

export default function RegisterScreen({ onRegister, onBack }) {
  const [form, setForm] = useState({ nombre:'', apellido:'', telefono:'', email:'', pass:'', colonia:'' });
  const [focused, setFocused] = useState('');
  const [step, setStep] = useState(1); // 1 = datos, 2 = confirmacion

  const ok = form.nombre.trim() && form.telefono.trim().length >= 10;

  function update(field, val) { setForm(f => ({ ...f, [field]: val })); }

  function handleSubmit() {
    if (!ok) return;
    if (step === 1) { setStep(2); return; }
    localStorage.setItem('3bq_name', form.nombre.trim());
    onRegister();
  }

  const fields1 = [
    { key:'nombre',    label:'Nombre',        type:'text',     placeholder:'Tu nombre' },
    { key:'apellido',  label:'Apellido',       type:'text',     placeholder:'Tu apellido' },
    { key:'telefono',  label:'Telefono',       type:'tel',      placeholder:'55 1234 5678' },
    { key:'email',     label:'Correo',         type:'email',    placeholder:'correo@ejemplo.com' },
    { key:'pass',      label:'Contrasena',     type:'password', placeholder:'Minimo 8 caracteres' },
    { key:'colonia',   label:'Colonia / CP',   type:'text',     placeholder:'Tu colonia o codigo postal' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* Header */}
      <div className="bg-[#ED1C24] px-8 pt-14 pb-8 flex-shrink-0">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-white/70 p-1 -ml-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <img src="/logo.png" alt="Tiendas 3B" className="h-8 object-contain" />
        </div>
        <h1 className="text-2xl font-black text-white leading-tight">
          {step === 1 ? 'Crear cuenta' : 'Confirma tus datos'}
        </h1>
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
          {step === 1 ? 'Paso 1 de 2 — Informacion personal' : 'Paso 2 de 2 — Todo listo'}
        </p>

        {/* Step bar */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-1 bg-white transition-all"/>
          <div className={`flex-1 h-1 transition-all ${step === 2 ? 'bg-white' : 'bg-white/30'}`}/>
        </div>
      </div>

      {/* STEP 1 — Form */}
      {step === 1 && (
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-6 space-y-4">
          {fields1.map(f => (
            <div key={f.key}>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] block mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                value={form[f.key]}
                placeholder={f.placeholder}
                onFocus={() => setFocused(f.key)}
                onBlur={() => setFocused('')}
                onChange={e => update(f.key, e.target.value)}
                className={`w-full border-2 px-4 py-3.5 text-sm text-[#4F4F4F] placeholder-[#9A9A9A] outline-none bg-white transition-colors ${focused === f.key ? 'border-[#ED1C24]' : 'border-[#E0E0E0]'}`}
              />
            </div>
          ))}

          {/* Terms */}
          <p className="text-[10px] text-[#9A9A9A] font-bold leading-snug pt-2">
            Al continuar aceptas los Terminos y Condiciones y el Aviso de Privacidad de Tiendas 3B.
          </p>

          <button
            onClick={handleSubmit}
            disabled={!ok}
            className={`w-full py-4 font-black text-sm text-white uppercase tracking-widest transition-opacity ${ok ? 'bg-[#ED1C24]' : 'bg-[#E0E0E0]'}`}>
            Continuar
          </button>
        </div>
      )}

      {/* STEP 2 — Confirm */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-6">

          {/* Confirm card */}
          <div className="bg-[#F9F9F9] border-2 border-[#E0E0E0] mb-5">
            <div className="px-4 py-3 border-b-2 border-[#E0E0E0]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Tus datos</p>
            </div>
            {[
              { label:'Nombre',    value: `${form.nombre} ${form.apellido}`.trim() },
              { label:'Telefono',  value: form.telefono || '—' },
              { label:'Correo',    value: form.email || '—' },
              { label:'Colonia',   value: form.colonia || '—' },
            ].map((row, i, arr) => (
              <div key={row.label} className={`px-4 py-3 flex items-center justify-between ${i < arr.length-1 ? 'border-b border-[#E0E0E0]' : ''}`}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">{row.label}</p>
                <p className="text-sm font-black text-[#4F4F4F]">{row.value}</p>
              </div>
            ))}
          </div>

          {/* Welcome message */}
          <div className="bg-[#FDE4E5] border-l-4 border-[#ED1C24] px-4 py-4 mb-5 flex items-center gap-4">
            <img src="/mascota.png" alt="" className="w-14 h-14 object-contain shrink-0"/>
            <div>
              <p className="font-black text-sm text-[#4F4F4F] leading-snug">
                Bienvenido, {form.nombre}
              </p>
              <p className="text-xs text-[#9A9A9A] font-bold mt-0.5">
                Ya puedes empezar a ganar puntos en tus visitas a Tiendas 3B
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#ED1C24] text-white font-black text-sm uppercase tracking-widest">
              Crear cuenta
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full py-3 border-2 border-[#E0E0E0] text-[#9A9A9A] font-black text-xs uppercase tracking-widest">
              Editar datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}