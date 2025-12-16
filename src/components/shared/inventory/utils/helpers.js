/* utils */
const getStockStatus = (stock, minimo) => {
  /* stock tag */
  if (stock < minimo) return { color: 'text-red-700', bg: 'bg-red-50', label: 'Bajo' };
  if (stock < minimo * 1.5) return { color: 'text-yellow-700', bg: 'bg-yellow-50', label: 'Medio' };
  return { color: 'text-green-600', bg: 'bg-green-50', label: 'Bueno' };
};

/* utils */
const getCaducidadStatus = (caducidad) => {
  /* expiry tag */
  const hoy = new Date();
  const fecha = new Date(caducidad);
  const dias = Math.floor((fecha - hoy) / (1000 * 60 * 60 * 24));
  if (dias < 30) return { color: 'text-red-700', bg: 'bg-red-50' };
  if (dias < 90) return { color: 'text-yellow-700', bg: 'bg-yellow-50' };
  return { color: 'text-gray-600', bg: 'bg-beehealth-body-main' };
};
export { getStockStatus, getCaducidadStatus };
