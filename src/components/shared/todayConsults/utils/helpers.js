// Get today's date (ISO)
export function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Filter list
export function filterConsults(consults, searchTerm) {
  return consults.filter((c) =>
    c?.patient?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Sum total
export function calculateTotalIngresos(consultas) {
  return consultas.reduce((acc, c) => acc + c.costo, 0);
}

// Open create modal
export function openCreate(setEditingItem, setShowModal) {
  setEditingItem(null);
  setShowModal(true);
}

// Open edit modal
export function openEdit(item, setEditingItem, setShowModal) {
  setEditingItem(item);
  setShowModal(true);
}

// Ask delete modal
export function askDelete(item, setItemToDelete, setShowDeleteModal) {
  setItemToDelete(item);
  setShowDeleteModal(true);
}

// Build payload for create
export function buildCreatePayload(form, todayISO) {
  return {
    id: Date.now(),
    fecha: todayISO(),
    hora: form.hora,
    paciente: form.patient, // ✅ Cambiar
    tipo: form.consultType, // ✅ Cambiar
    costo: parseFloat(form.consultPrice), // ✅ Cambiar
    pagado: form.paymentMethod, // ✅ Cambiar
    avatar: form.patient // ✅ Cambiar
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase(),
  };
}

// Handle create action
export function handleCreateAction(form, todayISO, setConsultas, setShowModal) {
  const payload = buildCreatePayload(form, todayISO);
  setConsultas((prev) => [...prev, payload]);
  setShowModal(false);
}

// Build payload for update
export function buildUpdatePayload(editingItem, form) {
  return {
    ...editingItem,
    hora: form.hora,
    paciente: form.paciente,
    tipo: form.tipo,
    costo: parseFloat(form.costo),
    pagado: form.pagado,
    avatar: form.paciente
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase(),
  };
}

// Handle update action
export function handleUpdateAction(form, editingItem, setConsultas, setShowModal, setEditingItem) {
  if (!editingItem) return;
  const updated = buildUpdatePayload(editingItem, form);
  setConsultas((prev) => prev.map((c) => (c.id === editingItem.id ? updated : c)));
  setShowModal(false);
  setEditingItem(null);
}

// Handle delete action
export function handleDeleteAction(
  itemToDelete,
  setConsultas,
  setShowDeleteModal,
  setItemToDelete
) {
  if (!itemToDelete) return;
  setConsultas((prev) => prev.filter((c) => c.id !== itemToDelete.id));
  setShowDeleteModal(false);
  setItemToDelete(null);
}
