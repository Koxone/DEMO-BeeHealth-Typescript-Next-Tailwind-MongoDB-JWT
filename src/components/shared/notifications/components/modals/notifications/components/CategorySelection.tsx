function CategorySelection({
  notificationScope,
  eventCategory,
  handleCategoryChange,
  massiveCategories,
  personalCategories,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Categoría de Evento</label>
      <select
        value={eventCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
      >
        <option value="">Selecciona una categoría...</option>
        {notificationScope === 'massive'
          ? massiveCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))
          : personalCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
      </select>
    </div>
  );
}

export default CategorySelection;
