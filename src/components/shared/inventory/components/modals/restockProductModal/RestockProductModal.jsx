'use client';

import { X, PackagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getGradient } from './utils/helpers';
import { restockProduct } from './services/restockProduct';
import { useModalClose } from '@/hooks/useModalClose';

export default function RestockProductModal({
  activeTab,
  onClose,
  filteredItems,
  onRestock,
  successRefresh,
}) {
  // Local states
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  const { handleOverlayClick } = useModalClose(onClose);

  // Create Product Backend Handler
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate inputs
    if (!selectedProduct || !quantity) {
      alert('Debes seleccionar un producto y especificar una cantidad válida.');
      return;
    }

    try {
      const response = await restockProduct({
        inventoryId: selectedProduct,
        quantity,
        reason,
      });

      if (response.success) {
        if (response.inventory) {
          onRestock?.(response.inventory);
        }

        setSelectedProduct('');
        setQuantity('');
        setReason('');
        successRefresh();
        onClose();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative */}
        <div
          className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradient(
            activeTab
          )} opacity-20 blur-3xl`}
        />
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradient(
            activeTab
          )} opacity-20 blur-3xl`}
        />

        {/* Header */}
        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-gray-100 backdrop-blur-xl">
          <div className={`absolute inset-0 bg-linear-to-r ${getGradient(activeTab)} opacity-10`} />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div
                    className={`relative flex items-center justify-center rounded-2xl bg-linear-to-br ${getGradient(
                      activeTab
                    )} p-3 shadow-lg`}
                  >
                    <PackagePlus className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Agregar existencias</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Selecciona un producto y la cantidad a reabastecer
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-180px)] space-y-4 overflow-y-auto p-6"
        >
          {/* Select product */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Producto</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-800 focus:border-blue-400 focus:ring-blue-400"
            >
              <option value="">Selecciona un producto</option>
              {filteredItems.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.product?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Current quantity display */}
          {selectedProduct && (
            <div className="bg-beehealth-body-main rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
              <span className="font-medium">Cantidad actual:</span>{' '}
              {filteredItems.find((item) => item._id === selectedProduct)?.quantity ??
                'No disponible'}
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Cantidad a agregar
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-800 focus:border-blue-400 focus:ring-blue-400"
              placeholder="Ej. 50"
            />
          </div>

          {/* Optional reason */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Motivo (opcional)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-800 focus:border-blue-400 focus:ring-blue-400"
              placeholder="Ej. Pedido del proveedor"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-all hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-all hover:bg-green-700"
            >
              Confirmar reabastecimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
