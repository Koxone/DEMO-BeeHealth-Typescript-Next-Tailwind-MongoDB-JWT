import React from 'react';
import ImageGalleryUpload from './components/ImageGalleryUpload';
import { ImageIcon, Play } from 'lucide-react';

function MultimediaSection({
  imageFiles,
  handleAddImageFile,
  handleAddImageButton,
  handleRemoveImageFile,
  uploadingImages,
  form,
  setForm,
}) {
  return (
    <div className="group bg-beehealth-body-main/80 border-beehealth-blue-primary-solid rounded-2xl border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-beehealth-blue-primary-solid rounded-xl p-2.5">
          <ImageIcon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Contenido Multimedia</h3>
      </div>

      {/* Images Gallery */}
      <div className="flex flex-col gap-10">
        <ImageGalleryUpload
          imageFiles={imageFiles}
          onAddImage={handleAddImageFile}
          onAddImageButton={handleAddImageButton}
          onRemoveImage={handleRemoveImageFile}
          uploadingImages={uploadingImages}
        />

        {/* Video Tutorial */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Play className="text-beehealth-blue-primary-dark h-4 w-4" />
            Video Tutorial (YouTube)
          </label>
          <input
            type="url"
            value={form.video}
            onChange={(e) => setForm({ ...form, video: e.target.value })}
            placeholder="https://www.youtube.com/embed/..."
            className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 font-mono text-sm text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
          />
          <div className="bg-beehealth-blue-primary-light flex items-start gap-2 rounded-lg px-3 py-2">
            <Play className="text-beehealth-blue-primary-solid mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-beehealth-blue-primary-dark text-xs">
              Solo copia y pega el URL de cualquier video en YouTube.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultimediaSection;
