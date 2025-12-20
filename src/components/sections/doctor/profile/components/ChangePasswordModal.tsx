'use client';

import { useState } from 'react';

export default function ChangePasswordModal({ userId, onClose, changePassword }) {
  // State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Submit
  const handleSubmit = () => {
    changePassword({
      userId,
      currentPassword,
      newPassword,
      confirmPassword,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-beehealth-body-main w-full max-w-md rounded-2xl p-6">
        <h3 className="mb-4 text-xl font-bold">Cambiar contraseña</h3>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Contraseña actual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border-2 p-3"
          />

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border-2 p-3"
          />

          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border-2 p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="rounded-xl bg-blue-600 px-4 py-2 text-white">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
