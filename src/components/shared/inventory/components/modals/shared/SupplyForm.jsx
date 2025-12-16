'use client';

import { useState } from 'react';

export default function SupplyForm({ mode, initialData, onCancel, onSubmit, role }) {
  // Local state
  const [form, setForm] = useState(() => ({
    name: initialData?.product?.name || '',
    category: initialData?.product?.category || '',
    specialty: initialData?.product?.specialty || '',
    quantity: initialData?.quantity != null ? String(initialData.quantity) : '',
    minStock: initialData?.minStock != null ? String(initialData.minStock) : '',
    maxStock: initialData?.maxStock != null ? String(initialData.maxStock) : '',
    costPrice:
      initialData?.product?.costPrice != null ? String(initialData.product?.costPrice) : '',
    salePrice:
      initialData?.product?.salePrice != null ? String(initialData.product?.salePrice) : '',
  }));

  // Handlers
  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim() || 'Suministro sin nombre',
      type: 'suministro',
      category: form.category.trim() || 'General',
      specialty: form.specialty,
      inStock: true,
      costPrice: Number(form.costPrice || 0),
      salePrice: Number(form.salePrice || 0),
      quantity: Number(form.quantity || 0),
      minStock: Number(form.minStock || 0),
      maxStock: Number(form.maxStock || 0),
    };

    onSubmit(payload);
  };

  // Categories for supplies
  const supplyCategories = [
    'Material de curación',
    'Material de protección',
    'Material de limpieza',
    'Equipo desechable',
    'Material de laboratorio',
    'Material dental',
    'Insumos diversos',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-beehealth-body-main/80 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-lg backdrop-blur-sm">
        {/* Specialty */}
        {role === 'employee' && (
          <div>
            {/* Label */}
            <label className="mb-2 block text-sm font-medium text-gray-700">Inventario de:</label>

            {/* Select */}
            <select
              name="specialty"
              value={form.specialty}
              onChange={(e) => handleChange('specialty', e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-3 outline-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="weight">Control de Peso</option>
              <option value="dental">Odontologia</option>
              <option value="esthetic">Medicina Estetica</option>
            </select>
          </div>
        )}
        {/* Nombre */}
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-gray-600">Nombre del suministro</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ej. Guantes de látex"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
        </div>

        {/* Categoría */}
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-gray-600">Categoría</label>
          <select
            required
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          >
            <option value="">Seleccionar categoría</option>
            {supplyCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad y stock mínimo */}
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Cantidad</label>
            <input
              type="number"
              min="0"
              value={form.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              placeholder="Ej. 10"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Stock mínimo</label>
            <input
              type="number"
              min="0"
              value={form.minStock}
              onChange={(e) => handleChange('minStock', e.target.value)}
              placeholder="Ej. 5"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Stock máximo y costo */}
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Stock máximo</label>
            <input
              type="number"
              min="0"
              value={form.maxStock}
              onChange={(e) => handleChange('maxStock', e.target.value)}
              placeholder="Ej. 20"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-600">Costo ($)</label>
            <input
              type="number"
              min="0"
              value={form.costPrice}
              onChange={(e) => handleChange('costPrice', e.target.value)}
              placeholder="Ej. 10"
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Precio de venta */}
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-gray-600">Precio de venta ($)</label>
          <input
            type="number"
            min="0"
            value={form.salePrice}
            onChange={(e) => handleChange('salePrice', e.target.value)}
            placeholder="Ej. 15"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3.5 font-semibold text-white shadow-lg hover:shadow-purple-500/50"
        >
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
