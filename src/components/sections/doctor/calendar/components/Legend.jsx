/* legend */
export default function Legend() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 border-t-2 border-gray-200 pt-4 text-xs">
      <div className="flex items-center gap-2">
        <div className="border-beehealth-green-primary-dark h-5 w-5 rounded-lg border-2 bg-linear-to-br from-blue-50 to-indigo-50" />
        <span className="font-medium text-gray-700">Con citas</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-beehealth-body-main h-5 w-5 rounded-lg border border-gray-300" />
        <span className="font-medium text-gray-700">Sin citas</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="from-beehealth-green-primary-solid to-beehealth-green-primary-dark h-5 w-5 rounded-lg bg-linear-to-r shadow-sm" />
        <span className="font-medium text-gray-700">Seleccionado</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-lg ring-2 ring-blue-500 ring-offset-2" />
        <span className="font-medium text-gray-700">Hoy</span>
      </div>
    </div>
  );
}
