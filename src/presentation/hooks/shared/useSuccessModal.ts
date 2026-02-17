// React
import { useCallback, useState } from 'react';

export const useSuccessModal = (duration = 1000) => {
  // States
  const [title, setTitle] = useState('Operacion Exitosa');
  const [message, setMessage] = useState('La operación se completó correctamente.');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handler
  const handleSuccessModal = useCallback(
    (title: string, message: string) => {
      setTitle(title);
      setMessage(message);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        setTitle('');
        setMessage('');
      }, duration);
    },
    [duration]
  );

  return {
    title,
    message,
    showSuccessModal,
    handleSuccessModal,
  };
};

// Usage Example
// const { title, message, showSuccessModal, handleSuccessModal } = useSuccessModal();
