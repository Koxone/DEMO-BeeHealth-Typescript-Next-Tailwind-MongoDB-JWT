import { X } from 'lucide-react';

function Header({ setShowAddClosure }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800">Crear Nueva Notificación</h3>
        <h4 className="text-sm text-gray-600">
          Elige entre notificaciones masivas o personalizadas
        </h4>
      </div>
      <button
        onClick={() => setShowAddClosure(false)}
        className="group hover:bg-beehealth-red-primary-solid rounded-lg bg-gray-100 p-2 text-gray-500 hover:text-white"
      >
        <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
      </button>
    </div>
  );
}

export default Header;
