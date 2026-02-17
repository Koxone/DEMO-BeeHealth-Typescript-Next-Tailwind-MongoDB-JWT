import { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import SharedField from './SharedField';

// Enums and Types
import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';

// Prop Types
interface ProfileCardProps {
  currentUser: CurrentUserFromAuthStoreType;
  isEditing: boolean;
  handleSuccessModal: (title: string, message: string) => void;
}

export default function SharedPersonalInfoCard({
  currentUser,
  isEditing,
  handleSuccessModal,
}: ProfileCardProps) {
  // State
  const [wasEditing, setWasEditing] = useState(false);
  const [email, setEmail] = useState<string>(currentUser?.email ?? '');
  const [phone, setPhone] = useState<string>(currentUser?.phone ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(currentUser?.email ?? '');
    setPhone(currentUser?.phone ?? '');
  }, [currentUser?.email, currentUser?.phone]);

  const handleSave = async () => {
    if (!currentUser?.id) return;

    // If email didn't change, no need to update
    if (email === currentUser.email) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          newEmail: email.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Revert to the original value
        setEmail(currentUser.email ?? '');
        return;
      }

      handleSuccessModal('Correo actualizado', 'Tu correo ha sido actualizado exitosamente.');
    } catch {
      // Revert to the original value
      setEmail(currentUser.email ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wasEditing && !isEditing) {
      handleSave();
    }

    setWasEditing(isEditing);
  }, [isEditing]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SharedField
        label="Correo Electrónico"
        value={email}
        type="email"
        isEditing={isEditing && !loading}
        icon={Mail}
        onChange={setEmail}
      />

      <SharedField
        label="Telefono"
        type="text"
        value={phone}
        isEditing={isEditing && !loading}
        icon={Phone}
        onChange={setPhone}
      />
    </div>
  );
}
