import { useState, useMemo } from 'react';

export default function useStateFromEditing(type, editingItem) {
  const initial = useMemo(() => {
    if (type === 'consulta') {
      return editingItem
        ? {
            hora: editingItem.hora,
            paciente: editingItem.paciente,
            tipo: editingItem.tipo,
            costo: String(editingItem.costo),
            pagado: editingItem.pagado,
          }
        : { hora: '', paciente: '', tipo: '', costo: '', pagado: true };
    }
    return editingItem
      ? {
          nombre: editingItem.nombre,
          cantidad: String(editingItem.cantidad),
          precioUnitario: String(editingItem.precioUnitario),
          paciente: editingItem.paciente,
        }
      : { nombre: '', cantidad: '', precioUnitario: '', paciente: '' };
  }, [type, editingItem]);

  const [form, setForm] = useState(initial);
  return [form, setForm];
}
