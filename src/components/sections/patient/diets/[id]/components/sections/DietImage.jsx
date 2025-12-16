import React from 'react';

function DietImage({ diet }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
      <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-black/20"></div>
      <img src={diet.images[0]} alt={diet.name} className="h-64 w-full object-cover md:h-40" />
    </div>
  );
}

export default DietImage;
