/* --- Service: Edit Quantity --- */
/* Sends a PATCH request to /api/inventory/edit/quantity to edit a product's quantity */

export async function editProductQuantity({ productId, quantity, reason }) {
  try {
    const res = await fetch('/api/inventory/edit/quantity', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        productId,
        quantity,
        reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Error editing product quantity',
      };
    }

    return {
      success: true,
      inventory: data.inventory,
      product: data.product,
      message: data.message || 'Quantity updated successfully',
    };
  } catch (error) {
    console.error('Error in editProductQuantity service:', error);
    return { success: false, error: error.message };
  }
}
