'use client';

import { Image as ImageIcon, Info, Loader, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ImageGalleryUploadEdit({
  existingImages = [],
  newImageFiles = [],
  onAddImage,
  onAddImageButton,
  onRemoveNewImage,
  onRemoveExistingImage,
  uploadingImages,
}) {
  const [previewUrls, setPreviewUrls] = useState({});

  // Initialize preview URLs for new image files
  useEffect(() => {
    const newPreviews = {};
    newImageFiles.forEach((file, index) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews[`new-${index}`] = e.target.result;
          setPreviewUrls((prev) => ({
            ...prev,
            [`new-${index}`]: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  }, [newImageFiles]);

  const handleFileChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls((prev) => ({
          ...prev,
          [`new-${index}`]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrls((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[`new-${index}`];
        return newPreviews;
      });
    }

    onAddImage(index, file);
  };

  const handleRemoveExisting = (index) => {
    onRemoveExistingImage(index);
  };

  const handleRemoveNew = (index) => {
    setPreviewUrls((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[`new-${index}`];
      return newPreviews;
    });

    onRemoveNewImage(index);
  };

  // Total images count
  const totalImages = existingImages.length + newImageFiles.length;

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <ImageIcon className="text-beehealth-blue-primary-solid h-4 w-4" />
          Galería de Imágenes
        </label>

        {/* Existing Images Section */}
        {existingImages.length > 0 && (
          <div className="space-y-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
              Imágenes Actuales ({existingImages.length})
            </p>
            <div className="space-y-3">
              {existingImages.map((imageUrl, index) => (
                <div
                  key={`existing-${index}`}
                  className="flex flex-col gap-3 rounded-lg border border-blue-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="truncate text-xs font-medium text-gray-600">
                        {imageUrl.split('/').pop() || `Imagen ${index + 1}`}
                      </p>
                      <p className="text-xs text-gray-500">Desde servidor</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExisting(index)}
                      disabled={uploadingImages[index]}
                      className="h-fit rounded-lg border-2 border-red-300 bg-red-50 px-2 py-2 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Existing Image Preview */}
                  <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={`Existing ${index + 1}`}
                      className="h-32 w-full rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/%3E%3C/svg%3E';
                      }}
                    />
                    {index === 0 && (
                      <div className="absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                        Portada
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Section */}
        {newImageFiles.length > 0 && (
          <div className="space-y-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
              Nuevas Imágenes ({newImageFiles.length})
            </p>
            <div className="space-y-3">
              {newImageFiles.map((file, index) => (
                <div key={`new-${index}`} className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                        disabled={uploadingImages[existingImages.length + index]}
                        className="bg-beehealth-body-main file:text-beehealth-blue-secondary-solid file:bg-beehealth-blue-primary-light hover:file:bg-beehealth-blue-primary-light-hover focus:border-beehealth-blue-primary-solid focus:shadow-beehealth-blue-primary-solid/20 w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-sm text-gray-900 shadow-sm transition-all duration-300 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1 file:text-xs file:font-semibold placeholder:text-gray-400 focus:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveNew(index)}
                      disabled={uploadingImages[existingImages.length + index]}
                      className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* New File Info */}
                  {file && (
                    <div className="flex items-start gap-3 rounded-lg border border-green-300 bg-green-100 px-3 py-2">
                      <div className="flex-1">
                        <p className="text-beehealth-blue-primary-solid text-xs font-medium">
                          {file.name}
                        </p>
                        <p className="text-beehealth-blue-primary-light text-xs">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                        {uploadingImages[existingImages.length + index] && (
                          <p className="text-beehealth-blue-primary-light mt-1 flex items-center gap-2 text-xs">
                            <Loader className="h-3 w-3 animate-spin" />
                            Subiendo...
                          </p>
                        )}
                      </div>
                      {existingImages.length + index === 0 && file && (
                        <span className="bg-beehealth-red-primary-light text-beehealth-red-primary-dark rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap">
                          Portada
                        </span>
                      )}
                    </div>
                  )}

                  {/* New Image Preview */}
                  {previewUrls[`new-${index}`] && (
                    <div className="border-beehealth-red-primary-light relative overflow-hidden rounded-xl border-2 bg-gray-100">
                      <img
                        src={previewUrls[`new-${index}`]}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full rounded-xl object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
            La primera imagen será la portada principal. Tienes {totalImages} imagen
            {totalImages !== 1 ? 'es' : ''}.
          </p>
        </div>
      </div>
    </div>
  );
}
