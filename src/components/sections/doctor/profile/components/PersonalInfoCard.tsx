import React, { useState, useEffect } from 'react';
import Field from './Field';
import { Award, Mail, MapPin, Phone, User } from 'lucide-react';

function PersonalInfoCard({
  user,
  isEditing,
  changeEmail,
  setShowSuccessModal,
  setTitle,
  setMessage,
  setIsEditing,
  loadUser,
}) {
  // State
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    setEmail(user?.email || '');
  }, [user?.email]);

  const handleSave = () => {
    if (email === user.email) return;

    changeEmail(
      { userId: user.id, email },
      {
        onSuccess: async () => {
          await loadUser();
          setTitle('¡Éxito!');
          setMessage('Correo electrónico actualizado con éxito!');
          setShowSuccessModal(true);
          setIsEditing(false);

          setTimeout(() => {
            setShowSuccessModal(false);
            setMessage('');
            setTitle('');
          }, 1000);
        },
      }
    );
  };

  useEffect(() => {
    if (!isEditing) {
      handleSave();
    }
  }, [isEditing]);

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg md:col-span-2">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Correo Electrónico"
          value={email}
          isEditing={isEditing}
          icon={Mail}
          onChange={setEmail}
        />

        <Field label="Telefono" value={user?.phone || ''} isEditing={false} icon={Phone} />
        <Field label="Cédula Profesional" value="1234567" isEditing={false} icon={Award} />
        <Field label="Universidad" value="UNAM" isEditing={false} icon={MapPin} />
      </div>
    </div>
  );
}

export default PersonalInfoCard;
