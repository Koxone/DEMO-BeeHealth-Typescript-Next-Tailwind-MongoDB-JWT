import { Tag } from 'lucide-react';
import React from 'react';

function Category({ diet }) {
  return (
    <div className="bg-beehealth-body-main flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-300">
      <div className="rounded-lg bg-blue-50 p-2">
        <Tag className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <p className="text-xs tracking-wide text-gray-500 uppercase">Categoría</p>
        <p className="text-sm font-semibold text-gray-900">{diet.category}</p>
      </div>
    </div>
  );
}

export default Category;
