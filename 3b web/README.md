# 🏆 3B Quest — Astro + React + Tailwind

> PWA instalable como app nativa. Misiones diarias, Radar 3B, puntos y rachas.

---

## 🚀 Setup (3 comandos)

```bash
npm install
npm run dev
# Abre http://localhost:4321
```

### Build para producción
```bash
npm run build
npm run preview
```

---

## 📁 Estructura

```
src/
├── pages/
│   └── index.astro          ← Entry point (un solo archivo Astro)
├── layouts/
│   └── Base.astro           ← HTML base, meta PWA, Poppins, Leaflet CSS
├── components/
│   ├── App.jsx              ← Shell con bottom nav + tab routing
│   ├── HomeTab.jsx          ← Inicio: misiones del día + tienda cercana + racha
│   ├── RadarTab.jsx         ← ⭐ Radar 3B: Leaflet map + cercanas + ruta
│   ├── MissionsTab.jsx      ← Misiones: detalle + pistas + confetti
│   ├── ProfileTab.jsx       ← Perfil: puntos, niveles, racha
│   └── MissionCard.jsx      ← Card reutilizable con hint toggle
├── hooks/
│   ├── useGameState.js      ← Puntos, rachas, misiones completadas (localStorage)
│   └── useLocation.js       ← GPS + tiendas cercanas por distancia Haversine
├── data/
│   ├── stores.js            ← 15 tiendas CDMX + función distanceTo
│   └── missions.js          ← 8 misiones + getDailyMissions (seed por fecha)
└── styles/
    └── global.css           ← Tailwind directives + utilidades 3B
```

---

## 📱 Instalar como App (PWA)

En Chrome/Edge móvil:
1. Abre la URL en el navegador
2. Menú → "Agregar a pantalla de inicio"
3. La app se instala como nativa — sin App Store

---

## 🧭 Radar 3B

- Mapa **OpenStreetMap** con **Leaflet** (sin API key)
- Geolocalización del dispositivo con fallback a CDMX para la demo
- Distancia calculada con **fórmula Haversine** (no requiere servicios externos)
- Al tocar una tienda: se centra el mapa + línea punteada roja + card con info
- Botón **"Ir"** → abre Google Maps con ruta de conducción

---

## 🎮 Mecánica de Misiones

- 3 misiones diarias rotativas (seed determinístico por fecha → siempre las mismas para todos ese día)
- Pistas desplegables que guían dentro de la tienda
- Puntos acumulados en **localStorage** (persisten entre sesiones)
- **Racha diaria** 🔥 — se rompe si no completas ninguna misión en el día
- 4 niveles: Explorador → Cazador → Maestro → Leyenda 3B 👑
- **Confetti** al completar una misión

---

## 🛠 Stack

| Tech | Uso |
|------|-----|
| **Astro 4** | Framework, routing, SSG |
| **React 18** | Componentes interactivos (`client:only`) |
| **Tailwind 3** | Estilos utilitarios + paleta 3B |
| **Leaflet** | Mapa interactivo (Radar 3B) |
| **localStorage** | Persistencia de puntos y racha |

---

## 🏆 Criterios del hackathon cubiertos

| Criterio | Peso | Cómo |
|----------|------|------|
| 💡 Idea & Creatividad | 35% | Gamificación única: misiones diarias con pistas físicas en tienda |
| 🎨 UI / UX | 30% | Paleta exacta 3B, Poppins, 4 tabs limpias, animaciones, mobile-first |
| 🏪 Impacto 3B | 15% | Cada misión requiere ir físicamente a la tienda |
| 🎤 Pitch | 10% | Ver pitch_3b_quest.docx |
| ⚙️ Radar 3B | 10% | Mapa + cercanas + selección + ruta → funcional sin API key |
