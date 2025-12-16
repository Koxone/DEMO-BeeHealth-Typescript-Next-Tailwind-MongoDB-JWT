'use client';
import { useMemo } from 'react';

export default function StatsBar({ inventory }) {
  // Filtered groups
  const medicamentos = useMemo(
    () => inventory.filter((i) => i.product?.type === 'medicamento'),
    [inventory]
  );

  const recetas = useMemo(() => inventory.filter((i) => i.product?.type === 'receta'), [inventory]);

  const suministros = useMemo(
    () => inventory.filter((i) => i.product?.type === 'suministro'),
    [inventory]
  );

  // Calculations
  const valorTotalMedicamentos = useMemo(
    () => medicamentos.reduce((sum, m) => sum + m.quantity * (m.product?.costPrice || 0), 0),
    [medicamentos]
  );

  const valorTotalSuministros = useMemo(
    () => suministros.reduce((sum, s) => sum + s.quantity * (s.product?.costPrice || 0), 0),
    [suministros]
  );

  const counts = {
    meds: medicamentos.length,
    recs: recetas.length,
    sums: suministros.length,
  };

  const items = [
    {
      label: 'Valor medicamentos',
      value: `$${valorTotalMedicamentos.toLocaleString()}`,
      tone: 'from-emerald-500 to-teal-600',
      title:
        'Monto total estimado si se vendieran todos los medicamentos actualmente en inventario al precio de venta establecido.',
    },
    {
      label: 'Valor suministros',
      value: `$${valorTotalSuministros.toLocaleString()}`,
      tone: 'from-indigo-500 to-purple-600',
      title:
        'Monto total invertido en materiales disponibles en el consultorio según su costo de compra.',
    },
    {
      label: 'Items totales',
      value: counts.meds + counts.recs + counts.sums,
      tone: 'from-blue-500 to-cyan-600',
      title:
        'Cantidad total de elementos registrados en el inventario, incluyendo medicamentos, recetas y suministros médicos.',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {items.map((s, i) => (
        <div
          key={s.label}
          title={s.title}
          style={{ animationDelay: `${i * 80}ms` }}
          className="bg-beehealth-body-main animate-[fadeIn_.25s_ease-out] rounded-2xl border-2 border-gray-200 p-4 shadow-sm"
        >
          <div
            className={`bg-beehealth-blue-primary-solid mb-2 inline-block rounded-lg px-2 py-1 text-xs font-bold text-white`}
          >
            {s.label}
          </div>
          <p className="text-2xl font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
