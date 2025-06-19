export class ImageResizer {
  static async resizeImage(
    file: File,
    width: number,
    height: number,
    maintainAspectRatio: boolean = false
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let newWidth = width;
        let newHeight = height;
        
        if (maintainAspectRatio) {
          const aspectRatio = img.width / img.height;
          if (width / height > aspectRatio) {
            newWidth = height * aspectRatio;
          } else {
            newHeight = width / aspectRatio;
          }
        }
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // Draw the resized image
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to resize image'));
            }
          },
          file.type,
          0.9
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
    });
  }
  
  static async resizeByPercentage(file: File, percentage: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const newWidth = Math.floor(img.width * (percentage / 100));
        const newHeight = Math.floor(img.height * (percentage / 100));
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to resize image'));
            }
          },
          file.type,
          0.9
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
    });
  }
  
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
    });
  }
}