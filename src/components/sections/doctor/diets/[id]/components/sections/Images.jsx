import { ImageIcon, Trash2, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useVercelBlobUpload } from '@/hooks/upload/useVercelBlobUpload';

export default function Images({
  diet,
  isEditing = false,
  editDiet,
  setShowSuccessModal,
  refreshDiets,
}) {
  const [images, setImages] = useState(diet.images || []);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const { uploadFile, loading: isUploading } = useVercelBlobUpload();

  useEffect(() => {
    setImages(diet.images || []);
  }, [diet.images]);

  const handleAddImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo excede el tamaño máximo de 5MB');
      return;
    }

    setError(null);

    try {
      const url = await uploadFile(file, 'diets');
      if (url) {
        setImages((prev) => [...prev, url]);
      }
    } catch (err) {
      setError(err.message || 'Error al subir imagen');
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await editDiet(diet._id, { images });
      refreshDiets();
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-beehealth-body-main rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <ImageIcon className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Imágenes</h2>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((img, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
            <img src={img} alt={`Imagen ${index + 1}`} className="h-full w-full object-cover" />
            {isEditing && (
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}

        {/* Empty state */}
        {images.length === 0 && !isEditing && (
          <p className="col-span-full text-center text-gray-500">No hay imágenes</p>
        )}
      </div>

      {/* Upload Input */}
      {isEditing && (
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
            <input
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              disabled={isUploading}
              className="hidden"
              id="diet-image-upload"
            />
            <label
              htmlFor="diet-image-upload"
              className="flex cursor-pointer flex-col items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Subiendo imagen...</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Haz clic para subir imágenes
                  </span>
                  <span className="text-xs text-gray-500">PNG, JPG o GIF (máx. 5MB)</span>
                </>
              )}
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving || isUploading}
              className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
