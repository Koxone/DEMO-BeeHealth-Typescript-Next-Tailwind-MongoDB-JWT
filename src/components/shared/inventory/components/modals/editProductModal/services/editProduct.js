/* --- Service: Edit Product --- */
/* Sends a PATCH request to /api/inventory/edit to edit a product */

export async function editProduct({
  inventoryId,
  name,
  category,
  quantity,
  costPrice,
  salePrice,
  minStock,
  maxStock,
  reason,
}) {
  try {
    const res = await fetch('/api/inventory/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        inventoryId,
        name,
        category,
        quantity,
        costPrice,
        salePrice,
        minStock,
        maxStock,
        reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Error editing product',
      };
    }

    return {
      success: true,
      inventory: data.inventory,
      product: data.product,
      message: data.message || 'Product updated successfully',
    };
  } catch (error) {
    console.error('Error in editProduct service:', error);
    return { success: false, error: error.message };
  }
}
