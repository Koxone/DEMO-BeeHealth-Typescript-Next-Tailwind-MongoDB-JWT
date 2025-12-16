// Standalone toggle

'use client';
import React, { useState } from 'react';

export default function ToggleEditModeButton({ isEditing, setIsEditing }) {
  // Toggle handler
  const handleToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Label */}
      <span className="text-sm font-medium text-gray-800">Modo edición</span>

      {/* Switch */}
      <div
        onClick={handleToggle}
        className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full transition-all duration-150 ease-in-out ${
          isEditing ? 'bg-beehealth-green-secondary-dark' : 'bg-gray-400'
        }`}
      >
        {/* Knob */}
        <div
          className={`absolute h-5 w-5 rounded-full bg-white transition-all duration-150 ease-in-out ${
            isEditing ? 'left-6' : 'left-1'
          }`}
        />
      </div>
    </div>
  );
}
