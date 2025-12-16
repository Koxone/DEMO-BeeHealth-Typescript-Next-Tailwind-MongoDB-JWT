const complianceMap = {
  completed: 'Completado',
  partial: 'Parcial',
  not_completed: 'No completado',
  pending: 'Pendiente',
};

const complianceColorMap = {
  completed: 'bg-green-100 text-green-700 border-green-300',
  partial: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  not_completed: 'bg-red-100 text-red-700 border-red-300',
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
};

const complianceButtonMap = {
  completed: { label: 'Cumplió' },
  partial: { label: 'Parcial' },
  not_completed: { label: 'No cumplió' },
  pending: { label: 'Pendiente' },
};

const getRatingText = (rating) => {
  const texts = {
    1: 'Muy bajo cumplimiento',
    2: 'Bajo cumplimiento',
    3: 'Cumplimiento regular',
    4: 'Buen cumplimiento',
    5: 'Excelente cumplimiento',
  };
  return texts[rating] || '';
};

export { complianceMap, complianceColorMap, complianceButtonMap, getRatingText };
