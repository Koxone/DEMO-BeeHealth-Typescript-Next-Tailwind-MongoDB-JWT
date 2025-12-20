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
    <div className="grid gap-4 md:grid-cols-2">
      <Field
        label="Correo Electrónico"
        value={email}
        isEditing={isEditing}
        icon={Mail}
        onChange={setEmail}
      />

      <Field label="Telefono" value={user?.phone || ''} isEditing={false} icon={Phone} />
    </div>
  );
}

export default PersonalInfoCard;
