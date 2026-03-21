import { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products.js';
import ProductDetail from './ProductDetail.jsx';

export default function CatalogTab() {
  const [search, setSearch] = useState('');
  const [cat,    setCat]    = useState('all');
  const [detail, setDetail] = useState(null);

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = cat === 'all' || p.category === cat;
    const matchSearch = search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (detail) {
    return <ProductDetail product={detail} onBack={() => setDetail(null)} />;
  }

  return (
    <div className="flex flex-col min-h-full bg-[#F9F9F9] w-full">

      {/* Header */}
      <div className="bg-[#ED1C24] pt-12 pb-4 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <img src="/logo.png" alt="3B" className="h-8 object-contain mb-2" />
          <p className="text-white font-black text-base uppercase tracking-wide mb-4">CATALOGO</p>
          <div className="flex items-center gap-2 bg-white px-3 py-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#9A9A9A" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar producto o marca..."
              className="flex-1 text-sm text-[#4F4F4F] font-medium outline-none bg-transparent placeholder-[#9A9A9A]"/>
            {search && (
              <button onClick={() => setSearch('')} className="text-[#9A9A9A] shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 pt-4 pb-8 space-y-4">

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide border-2 transition-colors ${
                cat === c.id ? 'bg-[#ED1C24] border-[#ED1C24] text-white' : 'bg-white border-[#E0E0E0] text-[#9A9A9A]'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''}{search ? ` para "${search}"` : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-[#E0E0E0] p-8 text-center">
            <p className="text-[#9A9A9A] font-black text-sm uppercase tracking-wide">Sin resultados</p>
            <p className="text-[#9A9A9A] text-xs mt-1">Intenta con otro termino</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map(p => (
              <div key={p.id}
                className="bg-white border-2 border-[#E0E0E0] flex flex-col cursor-pointer active:bg-[#F9F9F9]"
                onClick={() => setDetail(p)}>
                <div className="w-full bg-[#F9F9F9] flex items-center justify-center overflow-hidden" style={{height:130}}>
                  <img src={p.img} alt={p.name} className="h-full w-full object-contain p-3"/>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#9A9A9A]">{p.brand}</p>
                  <p className="text-sm font-black text-[#4F4F4F] leading-snug mt-0.5 flex-1">{p.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-base font-black text-[#ED1C24]">${p.price.toFixed(2)}</p>
                    <div className="bg-[#FDE4E5] px-2 py-1">
                      <p className="text-[9px] font-black text-[#ED1C24] uppercase">Ver mas</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
