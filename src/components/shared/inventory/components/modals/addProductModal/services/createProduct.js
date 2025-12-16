/* --- Service: createProduct --- */
/* Sends a POST request to /api/inventory to create a new product */

export async function createProduct(productData) {
  try {
    const res = await fetch('/api/inventory/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error al crear el producto');
    }

    const result = await res.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
