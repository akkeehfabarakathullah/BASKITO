import { useState, useCallback } from 'react';

export const usePhotoCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  const capturePhoto = useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      setIsCapturing(true);
      
      // Create file input for photo selection
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // Use rear camera on mobile
      
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setIsCapturing(false);
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setIsCapturing(false);
          resolve(null);
        }
      };
      
      input.click();
    });
  }, []);

  return { capturePhoto, isCapturing };
};