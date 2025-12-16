/* --- Service: Edit Stock --- */
/* Sends a PATCH request to /api/inventory/edit/stock to edit a product's stock */

export async function editProductStock({ productId, minStock, maxStock, reason }) {
  try {
    const res = await fetch('/api/inventory/edit/stock', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        productId,
        minStock,
        maxStock,
        reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Error editing product stock',
      };
    }

    return {
      success: true,
      message: data.message || 'Stock actualizada correctamente',
      product: data.product,
      inventory: data.inventory,
    };
  } catch (error) {
    console.error('Error in editProductStock service:', error);
    return { success: false, error: error.message };
  }
}
