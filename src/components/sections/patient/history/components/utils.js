export const getIMCCategory = (imc) => {
  if (imc < 18.5)
    return { label: 'Bajo peso', color: 'bg-amber-100 text-amber-700 border-amber-200' };
  if (imc < 25)
    return { label: 'Normal', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (imc < 30)
    return { label: 'Sobrepeso', color: 'bg-orange-100 text-orange-700 border-orange-200' };
  return { label: 'Obesidad', color: 'bg-rose-100 text-rose-700 border-rose-200' };
};

export const calculateStats = (historyData = []) => {
  if (!historyData.length) {
    return {
      pesoInicial: 0,
      pesoActual: 0,
      diferencia: '0.0',
      porcentaje: '0.0',
      isPositive: true,
    };
  }
  const pesoInicial = historyData[historyData.length - 1].peso;
  const pesoActual = historyData[0].peso;
  const diferencia = pesoInicial - pesoActual;
  const porcentaje = ((diferencia / pesoInicial) * 100).toFixed(1);

  return {
    pesoInicial,
    pesoActual,
    diferencia: Math.abs(diferencia).toFixed(1),
    porcentaje: Math.abs(porcentaje),
    isPositive: diferencia > 0,
  };
};
