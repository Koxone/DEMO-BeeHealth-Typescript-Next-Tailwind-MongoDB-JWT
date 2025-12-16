import React from 'react';

export default function Ingredients({ diet }) {
  const ingredients = diet.ingredients || [];

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm md:p-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Ingredientes</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ingredients.map((item, index) => (
          <div key={index} className="bg-beehealth-body-main flex items-start gap-3 rounded-lg">
            <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
