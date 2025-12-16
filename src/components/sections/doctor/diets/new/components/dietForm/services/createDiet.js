export async function createDiet(formData) {
  try {
    const response = await fetch('/api/diets/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error creando la dieta');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error del servidor');
  }
}
