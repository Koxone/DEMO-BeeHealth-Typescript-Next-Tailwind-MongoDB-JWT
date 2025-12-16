/* --- Service: fetchProductHistory --- */
/* Sends POST request to /api/inventory/history */

export async function fetchProductHistory(productId) {
  try {
    const res = await fetch('/api/inventory/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch product history');
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product history:', error);
    throw error;
  }
}
