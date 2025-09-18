/**
 * Preloads an array of image URLs by creating Image objects and waiting for them to load.
 *
 * This utility function helps improve user experience by loading images in advance,
 * preventing visible loading delays when the images are actually displayed.
 *
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise<void[]>} A promise that resolves when all images have either loaded or failed to load
 *
 * @example
 * // Preload images before displaying them
 * const imageUrls = [
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.png'
 * ];
 *
 * preloadImages(imageUrls)
 *   .then(() => {
 *     console.log('All images preloaded successfully');
 *     // Now display your gallery or content
 *   })
 *   .catch(error => {
 *     console.error('Some images failed to preload:', error);
 *   });
 *
 * @example
 * // Using with async/await
 * async function initializeGallery() {
 *   try {
 *     await preloadImages(galleryImageUrls);
 *     showGallery(); // Display gallery after images are preloaded
 *   } catch (error) {
 *     console.error('Failed to preload gallery images:', error);
 *     showGalleryWithPlaceholders(); // Fallback with placeholders
 *   }
 * }
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
