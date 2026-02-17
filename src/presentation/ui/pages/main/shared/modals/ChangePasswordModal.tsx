'use client';

// React and Libraries
import { useState } from 'react';
import { AlertCircle, Lock, X, Key, Loader, Eye, EyeOff, AlertTriangle } from 'lucide-react';

// Enums and Types
import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';

// Prop Types
interface ChangePasswordModalProps {
  currentUser: CurrentUserFromAuthStoreType;
  handleSuccessModal: (title: string, message: string) => void;
  setShowPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangePasswordModal({
  handleSuccessModal,
  setShowPasswordModal,
  currentUser,
}: ChangePasswordModalProps) {
  // State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);

  // Overlay close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === 'overlay') setShowPasswordModal(false);
  };

  // Validation
  const validateForm = () => {
    setLocalError('');

    if (newPassword.length < 6) {
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

  // Submit
  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!currentUser?.id) {
      setLocalError('Usuario no autenticado');
      return;
    }

    try {
      setLoading(true);
      setLocalError('');

      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLocalError(data?.message || 'Error al cambiar la contraseña');
        return;
      }

      // Close Change Password Modal
      setShowPasswordModal(false);

      // Show Success Modal and handle success actions
      handleSuccessModal('Contraseña cambiada', 'Tu contraseña ha sido actualizada exitosamente.');

      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch {
      setLocalError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Error message
  const displayError = localError;

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-r from-white via-blue-50/30 to-indigo-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative */}
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
                    <div className="bg-beehealth-blue-primary-solid relative rounded-2xl p-3 shadow-lg">
                      <Key className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-700">Cambiar Contraseña</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Ingresa tu contraseña actual y la nueva
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  disabled={loading}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200 disabled:opacity-50"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {displayError && (
              <div className="mb-4 rounded-xl border-2 border-red-200 bg-red-50/80 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">Error</p>
                    <p className="mt-1 text-xs text-red-700">{displayError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Current */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Contraseña actual
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setLocalError('');
                    }}
                    disabled={loading}
                    className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 py-3 pr-12 pl-12 outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-4 disabled:opacity-50"
                  >
                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* New */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setLocalError('');
                    }}
                    disabled={loading}
                    className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 py-3 pr-12 pl-12 outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-4 disabled:opacity-50"
                  >
                    {showNewPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirmar nueva contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setLocalError('');
                    }}
                    disabled={loading}
                    className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 py-3 pr-12 pl-12 outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-4 disabled:opacity-50"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                disabled={loading}
                className="button-beehealth-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="button-beehealth-confirm"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Guardar
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="bg-beehealth-body-main mt-4 flex items-start gap-2 rounded-lg px-3 py-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-gray-500" />
              <p className="text-xs text-gray-600">
                Tip: Puedes cancelar presionando <kbd>ESC</kbd> o haciendo clic fuera del modal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
