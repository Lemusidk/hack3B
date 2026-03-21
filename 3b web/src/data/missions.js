export const missions = [
  { id:'m1', emoji:'⭐', title:'¡El producto del día!',   category:'Descubrimiento', color:'#3B82F6',
    description:'Encuentra el producto marcado con la estrella roja en tu tienda más cercana.',
    hint:'Pista: Está en el pasillo de lácteos, al nivel de los ojos.',
    pts: 150 },
  { id:'m2', emoji:'🧺', title:'Canasta inteligente',     category:'Ahorro',         color:'#ED1C24',
    description:'Compra 5 productos de marca propia 3B y ahorra más del 20% vs otras marcas.',
    hint:'Los productos de marca propia tienen el logo 3B en el empaque.',
    pts: 200 },
  { id:'m3', emoji:'💪', title:'Misión proteína',         category:'Ahorro',         color:'#ED1C24',
    description:'Arma tu combo proteína del día: 1 pechuga + 1 huevo + 1 leguminosa. Todo en 3B.',
    hint:'Pechuga en refrigerados, huevos cerca de lácteos.',
    pts: 120 },
  { id:'m4', emoji:'🤝', title:'Comparte la misión',      category:'Social',         color:'#22C55E',
    description:'Lleva a un amigo a 3B hoy. Los dos ganan puntos dobles en su próxima visita.',
    hint:'Muestra esta pantalla al cajero para activar puntos dobles.',
    pts: 300 },
  { id:'m5', emoji:'🎲', title:'Colecciona sabores',      category:'Colección',      color:'#F59E0B',
    description:'Prueba un producto que nunca hayas comprado antes. ¡Hay más de 800 para explorar!',
    hint:'Hoy el producto sugerido está en el pasillo de botanas.',
    pts: 100 },
  { id:'m6', emoji:'📦', title:'Despensa del mes',        category:'Ahorro',         color:'#ED1C24',
    description:'Completa tu lista de básicos: aceite, arroz, frijol, azúcar. Todo al mejor precio.',
    hint:'Los abarrotes están en los pasillos centrales.',
    pts: 180 },
  { id:'m7', emoji:'🌮', title:'Canasta México',          category:'Descubrimiento', color:'#3B82F6',
    description:'Encuentra los 3 ingredientes del día para hacer tacos en menos de $80.',
    hint:'Tortillas, frijoles y salsa están juntos en abarrotes.',
    pts: 130 },
  { id:'m8', emoji:'🥤', title:'Hidratación inteligente', category:'Ahorro',         color:'#ED1C24',
    description:'Compra agua o bebida de marca 3B por menos de lo que pagarías en otra tienda.',
    hint:'Busca en el pasillo de bebidas las opciones de marca propia.',
    pts: 80 },
];

// 3 misiones diarias rotativas (seed por fecha)
export function getDailyMissions() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
  const shuffled = [...missions];
  // deterministic shuffle usando el seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 3);
}
