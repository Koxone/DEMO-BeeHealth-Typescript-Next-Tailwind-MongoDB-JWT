/* --- Service: Edit Product Info --- */
/* Sends a PATCH request to /api/inventory/edit/product */

export async function editProductInfo({
  productId,
  name,
  type,
  category,
  costPrice,
  salePrice,
  reason,
}) {
  try {
    const res = await fetch('/api/inventory/edit/product', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        productId,
        name,
        type,
        category,
        costPrice,
        salePrice,
        reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Error editing product info',
      };
    }

    return {
      success: true,
      message: data.message || 'Product info updated successfully',
      product: data.product,
      inventory: data.inventory,
    };
  } catch (error) {
    console.error('Error in editProductInfo service:', error);
    return { success: false, error: error.message };
  }
}
