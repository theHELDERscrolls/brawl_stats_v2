/**
 * Preloads an array of image URLs by creating Image objects and waiting for them to load.
 *
 * This utility function helps improve user experience by loading images in advance,
 * preventing visible loading delays when the images are actually displayed.
 *
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise<void[]>} A promise that resolves when all images have either loaded or failed to load
 */
export const preloadImages = (urls: string[]) => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
};
