export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class ImageCropper {
  static async cropImage(file: File, cropArea: CropArea): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // Draw the cropped portion of the image
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to crop image'));
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
  
  static async cropToSquare(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        
        canvas.width = size;
        canvas.height = size;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to crop image'));
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
  
  static async cropToRatio(file: File, ratio: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const [widthRatio, heightRatio] = ratio.split(':').map(Number);
        const targetRatio = widthRatio / heightRatio;
        const currentRatio = img.width / img.height;
        
        let cropWidth, cropHeight, x, y;
        
        if (currentRatio > targetRatio) {
          // Image is wider than target ratio
          cropHeight = img.height;
          cropWidth = cropHeight * targetRatio;
          x = (img.width - cropWidth) / 2;
          y = 0;
        } else {
          // Image is taller than target ratio
          cropWidth = img.width;
          cropHeight = cropWidth / targetRatio;
          x = 0;
          y = (img.height - cropHeight) / 2;
        }
        
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        ctx.drawImage(img, x, y, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to crop image'));
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
}