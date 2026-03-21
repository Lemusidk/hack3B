export const stores = [
  { id:"001", name:"3B Narvarte",       address:"Dr. José María Vértiz 932, Narvarte Oriente", lat:19.4028, lng:-99.1547, horario:"7:00 - 22:00", colonia:"Narvarte" },
  { id:"002", name:"3B Doctores",       address:"Eje 3 Sur 315, Doctores, Cuauhtémoc",         lat:19.4131, lng:-99.1440, horario:"7:00 - 22:00", colonia:"Doctores" },
  { id:"003", name:"3B Iztapalapa",     address:"Av. Ermita Iztapalapa 2960",                  lat:19.3655, lng:-99.0720, horario:"7:00 - 22:00", colonia:"Iztapalapa" },
  { id:"004", name:"3B Coyoacán",       address:"Av. México 219, Del Carmen",                  lat:19.3534, lng:-99.1610, horario:"7:00 - 22:00", colonia:"Coyoacán" },
  { id:"005", name:"3B Tlalpan",        address:"Calzada de Tlalpan 4271",                     lat:19.2900, lng:-99.1524, horario:"7:00 - 22:00", colonia:"Tlalpan" },
  { id:"006", name:"3B Lindavista",     address:"Av. Instituto Politécnico Nacional 575",      lat:19.4769, lng:-99.1337, horario:"7:00 - 22:00", colonia:"Lindavista" },
  { id:"007", name:"3B Gustavo Madero", address:"Av. 608 1209, San Juan de Aragón",            lat:19.4735, lng:-99.0950, horario:"7:00 - 22:00", colonia:"Gustavo A. Madero" },
  { id:"008", name:"3B Ecatepec",       address:"Av. Central 297, Jardines de Morelos",        lat:19.6018, lng:-99.0342, horario:"7:00 - 22:00", colonia:"Ecatepec" },
  { id:"009", name:"3B Nezahualcóyotl", address:"Av. Chimalhuacán 510",                        lat:19.4008, lng:-99.0254, horario:"7:00 - 22:00", colonia:"Nezahualcóyotl" },
  { id:"010", name:"3B Álvaro Obregón", address:"Av. Revolución 1425",                         lat:19.3760, lng:-99.2000, horario:"7:00 - 22:00", colonia:"Álvaro Obregón" },
  { id:"011", name:"3B Venustiano C.",  address:"Fray Servando Teresa de Mier 310",            lat:19.4280, lng:-99.1150, horario:"7:00 - 22:00", colonia:"Venustiano Carranza" },
  { id:"012", name:"3B Tláhuac",        address:"Av. Tláhuac 5800",                            lat:19.2970, lng:-99.0060, horario:"7:00 - 22:00", colonia:"Tláhuac" },
  { id:"013", name:"3B Xochimilco",     address:"Prolongación División del Norte 4007",        lat:19.2565, lng:-99.1050, horario:"7:00 - 22:00", colonia:"Xochimilco" },
  { id:"014", name:"3B Iztacalco",      address:"Av. Río La Piedad 400",                       lat:19.3950, lng:-99.0980, horario:"7:00 - 22:00", colonia:"Iztacalco" },
  { id:"015", name:"3B Miguel Hidalgo", address:"Av. Presidente Masaryk 8, Polanco",           lat:19.4335, lng:-99.1960, horario:"7:00 - 22:00", colonia:"Miguel Hidalgo" },
];

// Haversine distance in km
export function distanceTo(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export function distanceLabel(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}
