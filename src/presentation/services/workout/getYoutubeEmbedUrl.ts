export const getYoutubeEmbedUrl = (url?: string) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/v=([^&]+)/);
  const id = match?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
};
