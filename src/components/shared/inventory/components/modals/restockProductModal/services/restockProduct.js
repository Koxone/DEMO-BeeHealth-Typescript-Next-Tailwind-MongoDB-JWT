/* --- Service: Restock Product --- */
/* Sends a PATCH request to /api/inventory/restock to restock an inventory item */

export async function restockProduct({ inventoryId, quantity, reason }) {
  try {
    const res = await fetch('/api/inventory/restock', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ inventoryId, quantity, reason }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Error reabasteciendo el producto',
      };
    }

    return {
      success: true,
      inventory: data.inventory || data.updatedItem || data,
    };
  } catch (error) {
    console.error('Error en restockProduct service:', error);
    return { success: false, error: error.message };
  }
}
