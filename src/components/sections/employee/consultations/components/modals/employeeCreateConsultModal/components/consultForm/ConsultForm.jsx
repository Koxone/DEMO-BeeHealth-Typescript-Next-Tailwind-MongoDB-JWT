import { Clock, User, DollarSign, Notebook } from 'lucide-react';
import MedsSold from './components/MedsSold';
import { useGetAllPatients } from '@/hooks/patients/get/useGetAllPatients';
import { useEffect } from 'react';

/* Form */
export default function ConsultForm({ form, setForm }) {
  // Get Patients list call
  const { patients, isLoading, error } = useGetAllPatients();

  // Calculate totals
  const medsTotal = Array.isArray(form.itemsSold)
    ? form.itemsSold.reduce((acc, item) => acc + item.total, 0)
    : 0;
  const grandTotal = {
    consultPrice: form.consultPrice ? parseFloat(form.consultPrice) : 0,
    medsTotal,
  };

  useEffect(() => {
    // Subtotal meds
    const medsTotal = Array.isArray(form.itemsSold)
      ? form.itemsSold.reduce((acc, item) => acc + item.quantity * item.price, 0)
      : 0;

    const consultPrice = form.consultPrice ? parseFloat(form.consultPrice) : 0;

    const total = consultPrice + medsTotal;

    // Update form
    setForm({
      ...form,
      totalCost: total,
      totalItemsSold: medsTotal,
    });
  }, [form.consultPrice, form.itemsSold, setForm]);

  return (
    <div className="space-y-5">
      {/* Specialty */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Especialidad</label>

        <select
          required
          value={form.speciality}
          onChange={(e) =>
            setForm({
              ...form,
              speciality: e.target.value,
            })
          }
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="weight">Control de Peso</option>
          <option value="dental">Odontologia</option>
        </select>
      </div>

      {/* Consult Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Tipo de consulta</label>
        <p className="text-xs text-gray-500">
          Si es paciente de primera vez, priorizar crear su cuenta e historia clinica.
        </p>

        <select
          required
          value={form.consultType}
          onChange={(e) => setForm({ ...form, consultType: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="Primera Consulta">Primera Vez</option>
          <option value="Consulta General">Subsecuente</option>
        </select>
      </div>

      {/* Patient */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <User className="h-4 w-4 text-purple-500" />
          Paciente
        </label>

        {form.consultType === 'Primera Consulta' ? (
          <input
            type="text"
            required
            disabled={!form.consultType}
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            placeholder="Nombre del paciente"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          />
        ) : (
          <select
            required
            disabled={!form.consultType}
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Seleccionar paciente</option>

            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.fullName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Consult Price */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Costo de consulta
        </label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={form.consultPrice}
          onChange={(e) => setForm({ ...form, consultPrice: Number(e.target.value) })}
          placeholder="800.00"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>

      {/* Payment Method */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Método de pago</label>
        <select
          required
          value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>

      {/* Meds Sold */}
      <MedsSold form={form} setForm={setForm} />

      {/* Optional Notes */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Notebook className="h-4 w-4 text-emerald-500" />
          Notas
        </label>
        <input
          type="text"
          required
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Notas adicionales (opcional)"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>

      {/* Total */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Total
        </label>

        <div className="relative">
          {/* Prefix */}
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 select-none">
            $
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.totalCost}
            readOnly
            className="pointer-events-none w-full rounded-xl border-2 border-gray-200 px-8 py-3"
          />
        </div>
      </div>
    </div>
  );
}
