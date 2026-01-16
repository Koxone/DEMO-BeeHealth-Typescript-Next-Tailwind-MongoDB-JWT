'use client';

import { useModalClose } from '@/@hooks/useModalClose';
import { AlertCircle, Lock, X, Key, Loader, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ChangePasswordModal({
  userId,
  onClose,
  changePassword,
  setShowSuccessModal,
  isSubmitting,
  isError,
  isSuccess,
  setTitle,
  setMessage,
  error,
  reset,
}) {
  // State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  const validateForm = () => {
    setLocalError('');

    if (newPassword.length < 8) {
      setLocalError('La nueva contraseña debe tener al menos 8 caracteres');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Las contraseñas no coinciden');
      return false;
    }

    if (currentPassword === newPassword) {
      setLocalError('La nueva contraseña debe ser diferente a la actual');
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      setShowSuccessModal(true);
      setTitle('¡Éxito!');
      setMessage('Contraseña actualizada con éxito');
      setTimeout(() => {
        setTitle('');
        setMessage('');
        setShowSuccessModal(false);
        setLocalError('');
        reset();
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 1000);
    }
  }, [isSuccess, onClose, setShowSuccessModal]);

  // Submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    changePassword({
      userId,
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  // Error message
  const displayError = localError || (isError && error?.message);

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal Container */}
      <div className="relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-r from-white via-blue-50/30 to-indigo-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Elements */}
          <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-r from-blue-400/20 to-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-indigo-400/20 to-blue-400/20 blur-3xl" />

          {/* Header */}
          <div className="bg-beehealth-body-main/80 relative border-b border-blue-100 backdrop-blur-xl">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-500 opacity-5" />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-500 opacity-20" />
                    <div className="relative rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 p-3 shadow-lg">
                      <Key className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700">Cambiar Contraseña</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Ingresa tu contraseña actual y la nueva
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Error Message */}
            {displayError && (
              <div className="mb-4 rounded-xl border-2 border-red-200 bg-red-50/80 p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">Error</p>
                    <p className="mt-1 text-xs text-red-700">{displayError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Contraseña actual
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    maxLength={250}
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Ingresa tu contraseña actual"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setLocalError('');
                    }}
                    disabled={isSubmitting}
                    className={`bg-beehealth-body-main w-full rounded-xl border-2 py-3 pr-12 pl-12 transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                      displayError && displayError.includes('actual')
                        ? 'border-red-300'
                        : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    maxLength={250}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Ingresa tu nueva contraseña"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setLocalError('');
                    }}
                    disabled={isSubmitting}
                    className={`bg-beehealth-body-main w-full rounded-xl border-2 py-3 pr-12 pl-12 transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                      displayError &&
                      (displayError.includes('coinciden') ||
                        displayError.includes('8 caracteres') ||
                        displayError.includes('diferente'))
                        ? 'border-red-300'
                        : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirmar nueva contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    maxLength={250}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirma tu nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setLocalError('');
                    }}
                    disabled={isSubmitting}
                    className={`bg-beehealth-body-main w-full rounded-xl border-2 py-3 pr-12 pl-12 transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                      displayError && displayError.includes('coinciden')
                        ? 'border-red-300'
                        : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Information Message */}
            <div className="mt-6 rounded-xl border-2 border-blue-200 bg-blue-50/80 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Requisitos de contraseña</p>
                  <p className="mt-1 text-xs text-blue-700">
                    La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y
                    números.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !currentPassword || !newPassword || !confirmPassword}
                className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover group flex-1 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Guardar
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Additional Note */}
            <div className="bg-beehealth-body-main mt-4 flex items-start gap-2 rounded-lg px-3 py-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
              <p className="text-xs text-gray-600">
                Tip: Puedes cancelar presionando{' '}
                <kbd className="bg-beehealth-body-main rounded border px-1.5 py-0.5 text-xs font-semibold shadow-sm">
                  ESC
                </kbd>{' '}
                o haciendo clic fuera del modal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
