import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-blue-600" />
        <p className="text-lg font-medium text-gray-600">Cargando información...</p>
      </div>
    </div>
  );
}
