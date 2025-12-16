'use client';

import { X } from 'lucide-react';
import MedicationForm from '../shared/MedicationForm';
import PrescriptionForm from '../shared/PrescriptionForm';
import SupplyForm from '../shared/SupplyForm';

import { getGradient, getIcon } from './utils/helpers';
import { useModalClose } from '@/hooks/useModalClose';

// Edit Product services
import { editProductInfo } from './services/editProductInfo';
import { editProductStock } from './services/editStock';
import { editProductQuantity } from './services/editQuantity';
import { editProduct } from './services/editProduct';

export default function EditProductModal({ activeTab, item, onClose, onSubmit, successRefresh }) {
  const { handleOverlayClick } = useModalClose(onClose);

  async function handleEditSubmit(formData) {
    try {
      // Detect what changed
      const quantityChanged = formData.quantity !== item.quantity;
      const stockChanged =
        formData.minStock !== item.minStock || formData.maxStock !== item.maxStock;
      const infoChanged =
        formData.name !== item.product.name ||
        formData.type !== item.product.type ||
        formData.category !== item.product.category ||
        formData.costPrice !== item.product.costPrice ||
        formData.salePrice !== item.product.salePrice;

      if (!quantityChanged && !stockChanged && !infoChanged) {
        alert('No se hicieron cambios');
        return;
      }

      // Count how many types of changes
      const changeTypes = [quantityChanged, stockChanged, infoChanged].filter(Boolean).length;

      let response;

      // If multiple types of changes, use universal endpoint with ALL values
      if (changeTypes > 1) {
        response = await editProduct({
          inventoryId: item._id,
          name: formData.name,
          category: formData.category,
          quantity: formData.quantity,
          costPrice: formData.costPrice,
          salePrice: formData.salePrice,
          minStock: formData.minStock,
          maxStock: formData.maxStock,
          reason: formData.reason,
        });
      } else {
        // Single type of change - use specific endpoints
        if (quantityChanged) {
          response = await editProductQuantity({
            productId: item.product._id,
            quantity: formData.quantity,
            reason: formData.reason,
          });
        } else if (stockChanged) {
          response = await editProductStock({
            productId: item.product._id,
            minStock: formData.minStock,
            maxStock: formData.maxStock,
            reason: formData.reason,
          });
        } else if (infoChanged) {
          response = await editProductInfo({
            productId: item.product._id,
            name: formData.name,
            type: formData.type,
            category: formData.category,
            costPrice: formData.costPrice,
            salePrice: formData.salePrice,
            reason: formData.reason,
          });
        }
      }

      if (response.success) {
        onSubmit?.(response.inventory || item);
        successRefresh();
        onClose();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  const renderForm = () => {
    if (activeTab === 'medicamentos') {
      return (
        <MedicationForm
          mode="edit"
          initialData={item}
          onCancel={onClose}
          onSubmit={handleEditSubmit}
        />
      );
    }
    if (activeTab === 'recetas') {
      return (
        <PrescriptionForm
          mode="edit"
          initialData={item}
          onCancel={onClose}
          onSubmit={handleEditSubmit}
        />
      );
    }
    return (
      <SupplyForm mode="edit" initialData={item} onCancel={onClose} onSubmit={handleEditSubmit} />
    );
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${getGradient(activeTab)} opacity-20 blur-3xl`}
        />
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${getGradient(activeTab)} opacity-20 blur-3xl`}
        />

        <div className="bg-beehealth-body-main/80 relative overflow-hidden border-b border-gray-100 backdrop-blur-xl">
          <div className={`absolute inset-0 bg-linear-to-r ${getGradient(activeTab)} opacity-10`} />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div
                    className={`relative flex items-center justify-center rounded-2xl bg-linear-to-br ${getGradient(activeTab)} p-3 shadow-lg`}
                  >
                    {getIcon(activeTab)}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Editar{' '}
                    {activeTab === 'medicamentos'
                      ? 'Medicamento'
                      : activeTab === 'recetas'
                        ? 'Receta'
                        : 'Suministro'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">Actualiza los datos existentes</p>
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

        <div className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">{renderForm()}</div>
      </div>
    </div>
  );
}
