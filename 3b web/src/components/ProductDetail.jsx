export default function ProductDetail({ product, onBack }) {
  return (
    <div className="flex flex-col min-h-full bg-[#F9F9F9] w-full">

      {/* Header */}
      <div className="bg-[#ED1C24] pt-12 pb-3 flex items-center gap-3 flex-shrink-0 px-4 sm:px-8">
        <button onClick={onBack} className="text-white p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="text-white font-black text-base uppercase tracking-wide flex-1 truncate">{product.brand}</p>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 pt-6 pb-8 space-y-4">

        {/* Image */}
        <div className="bg-white border-2 border-[#E0E0E0] flex items-center justify-center" style={{height:220}}>
          <img src={product.img} alt={product.name} className="h-full object-contain p-6"/>
        </div>

        {/* Name + price */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">{product.brand}</p>
            <h1 className="text-xl font-black text-[#4F4F4F] leading-tight mt-0.5">{product.name}</h1>
          </div>
          <div className="bg-[#ED1C24] px-4 py-2 shrink-0">
            <p className="text-white font-black text-2xl leading-none">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map(t => (
            <span key={t} className="bg-[#FDE4E5] text-[#ED1C24] text-[10px] font-black px-3 py-1 uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white border-2 border-[#E0E0E0] p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A] mb-2">Descripcion</p>
          <p className="text-sm text-[#4F4F4F] font-medium leading-relaxed">{product.description}</p>
        </div>

        {/* Info table */}
        <div className="bg-white border-2 border-[#E0E0E0]">
          <div className="px-4 py-3 border-b-2 border-[#E0E0E0]">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Informacion del producto</p>
          </div>
          {product.info.map((row, i) => (
            <div key={i} className={`px-4 py-3 flex items-center justify-between ${i < product.info.length-1 ? 'border-b border-[#E0E0E0]' : ''}`}>
              <p className="text-xs font-black uppercase tracking-wide text-[#9A9A9A]">{row.label}</p>
              <p className="text-sm font-black text-[#4F4F4F]">{row.value}</p>
            </div>
          ))}
        </div>

        {/* Contenido */}
        <div className="bg-[#F9F9F9] border-2 border-[#E0E0E0] px-4 py-3 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#9A9A9A]">Contenido neto</p>
          <p className="text-sm font-black text-[#4F4F4F]">{product.contenido}</p>
        </div>

        {/* CTA — find in store, not buy online */}
        <div className="bg-[#4F4F4F] p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#ED1C24] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
              <circle cx="12" cy="9" r="2.5" fill="#ED1C24"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-white font-black text-sm">Encuentra este producto</p>
            <p className="text-[#9A9A9A] text-xs font-bold">Disponible en tu Tienda 3B mas cercana</p>
          </div>
        </div>
      </div>
    </div>
  );
}
