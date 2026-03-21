export const missions = [
  {
    id:'m1', category:'Descubrimiento', color:'#2980B9',
    title:'Producto del dia',
    description:'Encuentra el producto marcado con estrella roja en tu tienda mas cercana.',
    hint:'Esta en el pasillo de lacteos, al nivel de los ojos.',
    pts: 150, xp: 50,
  },
  {
    id:'m2', category:'Ahorro', color:'#ED1C24',
    title:'Canasta inteligente',
    description:'Compra 5 productos de marca propia 3B y ahorra mas del 20%.',
    hint:'Los productos de marca propia tienen el logo 3B en el empaque.',
    pts: 200, xp: 80,
  },
  {
    id:'m3', category:'Ahorro', color:'#ED1C24',
    title:'Mision proteina',
    description:'Arma tu combo proteina del dia: 1 pechuga + 1 huevo + 1 leguminosa.',
    hint:'Pechuga en refrigerados, huevos cerca de lacteos.',
    pts: 120, xp: 40,
  },
  {
    id:'m4', category:'Social', color:'#27AE60',
    title:'Comparte la mision',
    description:'Lleva a un amigo a 3B hoy. Los dos ganan puntos dobles.',
    hint:'Muestra esta pantalla al cajero para activar puntos dobles.',
    pts: 300, xp: 100,
  },
  {
    id:'m5', category:'Coleccion', color:'#9B59B6',
    title:'Colecciona sabores',
    description:'Prueba un producto que nunca hayas comprado antes.',
    hint:'El producto sugerido esta en el pasillo de botanas.',
    pts: 100, xp: 35,
  },
  {
    id:'m6', category:'Ahorro', color:'#ED1C24',
    title:'Despensa del mes',
    description:'Completa tu lista de basicos: aceite, arroz, frijol, azucar.',
    hint:'Los abarrotes estan en los pasillos centrales.',
    pts: 180, xp: 60,
  },
  {
    id:'m7', category:'Descubrimiento', color:'#2980B9',
    title:'Canasta Mexico',
    description:'Encuentra los 3 ingredientes del dia para hacer tacos en menos de $80.',
    hint:'Tortillas, frijoles y salsa estan juntos en abarrotes.',
    pts: 130, xp: 45,
  },
  {
    id:'m8', category:'Ahorro', color:'#ED1C24',
    title:'Hidratacion inteligente',
    description:'Compra agua o bebida de marca 3B por menos de $20.',
    hint:'Busca en el pasillo de bebidas las opciones de marca propia.',
    pts: 80, xp: 25,
  },
];

export function getDailyMissions() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
  const shuffled = [...missions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 3);
}

export const LEVELS = [
  { level:1, name:'Explorador',  minXp:0,    maxXp:200  },
  { level:2, name:'Cazador',     minXp:200,  maxXp:500  },
  { level:3, name:'Maestro',     minXp:500,  maxXp:1000 },
  { level:4, name:'Campeon 3B',  minXp:1000, maxXp:2000 },
  { level:5, name:'Leyenda 3B',  minXp:2000, maxXp:5000 },
];

export function getLevelByXp(xp) {
  return [...LEVELS].reverse().find(l => xp >= l.minXp) || LEVELS[0];
}
