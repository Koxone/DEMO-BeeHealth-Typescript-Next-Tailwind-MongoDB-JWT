'use client';

import { Image as ImageIcon, Info, Loader } from 'lucide-react';
import { useState } from 'react';

export default function ImageGalleryUpload({
  imageFiles,
  onAddImage,
  onAddImageButton,
  onRemoveImage,
  uploadingImages,
}) {
  const [previewUrls, setPreviewUrls] = useState({});

  const handleFileChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls((prev) => ({
          ...prev,
          [index]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrls((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[index];
        return newPreviews;
      });
    }

    onAddImage(index, file);
  };

  const handleRemoveImage = (index) => {
    setPreviewUrls((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });

    onRemoveImage(index);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <ImageIcon className="text-beehealth-blue-primary-solid h-4 w-4" />
          Galería de Imágenes
        </label>

        {/* Images List */}
        <div className="space-y-3">
          {imageFiles.map((file, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    disabled={uploadingImages[index]}
                    className="bg-beehealth-body-main file:text-beehealth-blue-secondary-solid file:bg-beehealth-blue-primary-light hover:file:bg-beehealth-blue-primary-light-hover focus:border-beehealth-blue-primary-solid focus:shadow-beehealth-blue-primary-solid/20 w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-sm text-gray-900 shadow-sm transition-all duration-300 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold placeholder:text-gray-400 focus:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  disabled={uploadingImages[index]}
                  className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>

              {/* File Info */}
              {file && (
                <div className="flex items-start gap-3 rounded-lg bg-pink-50 px-3 py-2">
                  <div className="flex-1">
                    <p className="text-beehealth-blue-primary-solid text-xs font-medium">
                      {file.name}
                    </p>
                    <p className="text-beehealth-blue-primary-light text-xs">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                    {uploadingImages[index] && (
                      <p className="text-beehealth-blue-primary-light mt-1 flex items-center gap-2 text-xs">
                        <Loader className="h-3 w-3 animate-spin" />
                        Subiendo...
                      </p>
                    )}
                  </div>
                  {index === 0 && file && (
                    <span className="bg-beehealth-red-primary-light text-beehealth-red-primary-dark rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap">
                      Portada
                    </span>
                  )}
                </div>
              )}

              {/* Preview */}
              {previewUrls[index] && (
                <div className="border-beehealth-red-primary-light relative overflow-hidden rounded-xl border-2 bg-gray-100">
                  <img
                    src={previewUrls[index]}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={onAddImageButton}
          className="text-beehealth-blue-secondary-solid border-beehealth-blue-primary-solid bg-beehealth-blue-primary-light hover:border-beehealth-blue-primary-solid-hover hover:bg-beehealth-blue-primary-light-hover w-full rounded-xl border-2 border-dashed px-4 py-3.5 font-semibold shadow-sm transition-all duration-300 active:scale-95"
        >
          + Agregar otra imagen
        </button>

        {/* Info */}
        <div className="bg-beehealth-blue-primary-light flex items-start gap-2 rounded-lg px-3 py-2">
          <Info className="text-beehealth-blue-primary-dark mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-beehealth-blue-primary-dark text-xs">
            La primera imagen será la portada principal.
          </p>
        </div>
      </div>
    </div>
  );
}
