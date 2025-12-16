'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Package,
  Sparkles,
  Info,
  ClipboardList,
  ShoppingCart,
  CreditCard,
  Calendar,
} from 'lucide-react';

export default function DoctorSaleProductsModal({ onClose }) {
  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = '');
  }, []);

  // Form state
  const [productForm, setProductForm] = useState({
    fecha: '2025-11-06',
    producto: '',
    cantidad: 1,
    precio: '',
    observaciones: '',
    consultorio: 'Lomas Verdes',
    pago1: '',
    pago2: '',
    formaPago1: 'Pendiente de pago',
    formaPago2: 'Pendiente de pago',
    caja1: 'Caja 1',
    caja2: 'Caja 1',
  });

  const handleChange = (field, value) => {
    setProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <div
          className="animate-in fade-in zoom-in-95 relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-white via-purple-50/30 to-indigo-50/30 shadow-2xl backdrop-blur-md duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-white/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-indigo-500 opacity-10" />
            <div className="relative px-6 py-6 sm:px-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-purple-500 opacity-20" />
                    <div className="relative rounded-2xl bg-linear-to-br from-purple-500 to-indigo-500 p-3 shadow-lg">
                      <ShoppingCart className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Registrar venta de producto
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Completa los campos para registrar una nueva venta
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300 relative max-h-[calc(95vh-180px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Información básica */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 p-2.5">
                    <Info className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Información del producto</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Fecha */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      Fecha
                    </label>
                    <div className="bg-beehealth-body-main rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm">
                      {productForm.fecha}
                    </div>
                  </div>

                  {/* Producto */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <ClipboardList className="h-4 w-4 text-indigo-500" />
                      Producto
                    </label>
                    <select
                      required
                      value={productForm.producto}
                      onChange={(e) => handleChange('producto', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                    >
                      <option value="">Seleccionar</option>
                      <option>GUM FLOSSERS CRAYOLA (INFANTIL)</option>
                      <option>CEPILLO NATURA</option>
                      <option>HILO DENTAL</option>
                      <option>COLUTORIO GENGIBAL</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 p-2.5">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Detalles del producto</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Cantidad */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Cantidad</label>
                    <input
                      type="number"
                      value={productForm.cantidad}
                      onChange={(e) => handleChange('cantidad', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Precio */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Precio</label>
                    <input
                      type="number"
                      value={productForm.precio}
                      onChange={(e) => handleChange('precio', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Consultorio */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Consultorio</label>
                    <input
                      type="text"
                      value={productForm.consultorio}
                      onChange={(e) => handleChange('consultorio', e.target.value)}
                      className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Observaciones */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Observaciones</label>
                    <textarea
                      value={productForm.observaciones}
                      onChange={(e) => handleChange('observaciones', e.target.value)}
                      className="bg-beehealth-body-main w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                      rows="2"
                    />
                  </div>
                </div>
              </div>

              {/* Pagos */}
              <div className="bg-beehealth-body-main/80 rounded-2xl border border-gray-100 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-linear-to-br from-violet-500 to-purple-500 p-2.5">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Pagos y formas de cobro</h3>
                </div>

                {[1, 2].map((i) => (
                  <div key={i} className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Pago{i}</label>
                      <input
                        type="number"
                        value={productForm[`pago${i}`]}
                        onChange={(e) => handleChange(`pago${i}`, e.target.value)}
                        className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Caja</label>
                      <select
                        value={productForm[`caja${i}`]}
                        onChange={(e) => handleChange(`caja${i}`, e.target.value)}
                        className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-indigo-500 focus:shadow-md focus:shadow-indigo-500/20 focus:outline-none"
                      >
                        <option>Caja 1</option>
                        <option>Caja 2</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">Forma de pago</label>
                      <select
                        value={productForm[`formaPago${i}`]}
                        onChange={(e) => handleChange(`formaPago${i}`, e.target.value)}
                        className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      >
                        <option>Pendiente de pago</option>
                        <option>Efectivo</option>
                        <option>Tarjeta Débito</option>
                        <option>Tarjeta Crédito</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="group flex-1 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Package className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Agregar Producto
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
