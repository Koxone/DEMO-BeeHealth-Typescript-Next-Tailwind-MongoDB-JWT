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
// const { handleOverlayClick } = useModalClose(onClose);

// <div
//   id="overlay"
//   onClick={handleOverlayClick}
//   className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
// >
//   {/* Modal container */}
//   <div
//     className="bg-beehealth-body-main relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
//     onClick={(e) => e.stopPropagation()}
//   >
