import { useState } from 'react';

export function useVercelBlobUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * uploadFile
   * @param {File} file 
   * @param {'avatars' | 'diets'} folder 
   * @returns {Promise<string>}
   */
  const uploadFile = async (file, folder) => {
    if (!file) return null;
    setLoading(true);
    setError(null);

    try {
      const timestamp = Date.now();
      const safeFilename = `${folder}/${timestamp}-${file.name}`;

      const res = await fetch(`/api/upload?filename=${safeFilename}`, {
        method: 'POST',
        body: file,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Upload failed');
        setLoading(false);
        return null;
      }

      setLoading(false);
      return data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { uploadFile, loading, error };
}

// How to use it
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);
// const { uploadFile } = useVercelBlobUpload();

// const handleAddImage = async (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   if (file.size > 5 * 1024 * 1024) {
//     alert('El archivo excede el tamaño máximo de 5MB');
//     return;
//   }

//   setLoading(true);
//   setError(null);
//   try {
//     const url = await uploadFile(file, 'diets');
//     if (url) setImages([...images, url]);
//   } catch (err) {
//     setError(err.message);
//   }
//   setLoading(false);
// };
