/* --- Service: toggleProductStatus --- */
/* Sends PATCH request to /api/inventory/disable */

export async function toggleProductStatus({ inventoryId, inStock }) {
  try {
    const res = await fetch('/api/inventory/disable', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ inventoryId, inStock }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to toggle product');

    return data; // Backend devuelve el inventario actualizado
  } catch (error) {
    throw error;
  }
}
