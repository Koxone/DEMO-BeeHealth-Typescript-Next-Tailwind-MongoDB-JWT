import { useState } from 'react';

// Types
type UploadFolder = 'avatars' | 'diets';

interface UploadResult {
  uploadFile: (file: File | null, folder: UploadFolder) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useVercelBlobUpload(): UploadResult {
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Upload
  const uploadFile = async (file: File | null, folder: UploadFolder): Promise<string | null> => {
    if (!file) return null;

    setLoading(true);
    setError(null);

    try {
      const timestamp = Date.now();
      const safeFilename = `${folder}/${timestamp}-${file.name}`;

      const res = await fetch(`/api/uploads?filename=${safeFilename}`, {
        method: 'POST',
        body: file,
      });

      const data: { url?: string; error?: string } = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Upload failed');
        setLoading(false);
        return null;
      }

      setLoading(false);
      return data.url ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      setLoading(false);
      return null;
    }
  };

  return { uploadFile, loading, error };
}

// Usage Example:
// const { uploadFile, loading, error } = useVercelBlobUpload();
// const handleFileChange = async (e) => {
//   const file = e.target.files?.[0] || null;
//   const url = await uploadFile(file, 'diets');
//   if (url) console.log('File uploaded to:', url);
// };
