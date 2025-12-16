import { AlertCircle } from 'lucide-react';

function ErrorState() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-4 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <p className="text-gray-600">Error al cargar la dieta</p>
      </div>
    </div>
  );
}

export default ErrorState;
