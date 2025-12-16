import { useEffect } from 'react';

// Hook for handling modal close events
export function useModalClose(onClose?: () => void) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close when clicking outside the modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'overlay') onClose?.();
  };

  return { handleOverlayClick };
}

// How to use?:
// const { handleOverlayClick } = useModalClose(() => setShowDeleteModal(false));
