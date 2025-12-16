import { Loader, Power, PowerOff, X } from 'lucide-react';

function Header({ isDeactivating, selectedWorkout, isProcessing, setShowToggleModal }) {
  return (
    <div
      className={`bg-beehealth-body-main/80 relative border-b backdrop-blur-xl ${
        isDeactivating ? 'border-red-100' : 'border-green-100'
      }`}
      style={{
        backgroundImage: `url(${selectedWorkout?.workout?.images?.[0]})`,
        backgroundColor: 'rgba(0,0,0,0.70)',
        backgroundBlendMode: 'darken',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className={`absolute inset-0 opacity-5 ${
          isDeactivating
            ? 'bg-linear-to-br from-red-500 to-orange-500'
            : 'bg-linear-to-br from-green-500 to-emerald-500'
        }`}
      />
      <div className="relative px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div
                className={`absolute inset-0 animate-ping rounded-2xl opacity-20 ${
                  isDeactivating ? 'bg-red-500' : 'bg-green-500'
                }`}
              />
              <div
                className={`relative rounded-2xl p-3 shadow-lg transition-all duration-300 ${
                  isDeactivating
                    ? 'bg-linear-to-br from-red-500 to-orange-600'
                    : 'bg-linear-to-br from-green-500 to-emerald-600'
                }`}
              >
                {isProcessing ? (
                  <Loader className="h-7 w-7 animate-spin text-white" />
                ) : isDeactivating ? (
                  <PowerOff className="h-7 w-7 text-white" />
                ) : (
                  <Power className="h-7 w-7 text-white" />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isDeactivating ? 'Desactivar Entrenamiento' : 'Activar Entrenamiento'}
              </h2>
              <p className="mt-1 text-sm text-white">
                {isDeactivating
                  ? 'Registra el cumplimiento del paciente'
                  : 'El paciente comenzará este entrenamiento'}
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={() => setShowToggleModal(false)}
              className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-600 transition-colors" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
