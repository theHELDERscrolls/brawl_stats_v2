/**
 * Preloads an array of image URLs to improve user experience
 * @param urls - Array of image URLs to preload
 * @returns Promise that resolves when all images have loaded or failed
 */
export const preloadImages = (urls: string[]) => {
  // Create promises for each image load
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          // Create new image element
          const img = new Image();
          // Set image source to start loading
          img.src = url;
          // Resolve promise when image loads successfully
          img.onload = () => resolve();
          // Also resolve on error to prevent blocking
          img.onerror = () => resolve();
        })
    )
  );
};
