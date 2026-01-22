import { useState, useEffect } from 'react';
import Field from './Field';
import { Mail, Phone } from 'lucide-react';

// Custom Hooks

function PersonalInfoCard({
  user,
  isEditing,
  changeEmail,
  changePhone,
  setShowSuccessModal,
  setTitle,
  setMessage,
  setIsEditing,
  refetchCurrentUser,
}) {
  // State
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  useEffect(() => {
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
  }, [user?.email, user?.phone]);

  const handleSaveEmail = () => {
    if (email === user.email) return;

    changeEmail(
      { userId: user.id, email },
      {
        onSuccess: async () => {
          await refetchCurrentUser();
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

  const handleSavePhone = () => {
    if (phone === user.phone) return;

    changePhone(
      { userId: user.id, phone },
      {
        onSuccess: async () => {
          await refetchCurrentUser();
          setTitle('¡Éxito!');
          setMessage('Teléfono actualizado con éxito!');
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
      handleSaveEmail();
      handleSavePhone();
    }
  }, [isEditing]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field
        label="Correo Electrónico"
        value={email}
        type="email"
        isEditing={isEditing}
        icon={Mail}
        onChange={setEmail}
      />

      <Field
        label="Telefono"
        type="text"
        value={phone}
        isEditing={isEditing}
        icon={Phone}
        onChange={setPhone}
      />
    </div>
  );
}

export default PersonalInfoCard;
