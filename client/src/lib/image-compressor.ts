export class ImageCompressor {
  static async compressImage(file: File, quality: number = 0.8, maxWidth?: number, maxHeight?: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        
        // Calculate new dimensions if max dimensions are provided
        if (maxWidth || maxHeight) {
          const ratio = Math.min(
            maxWidth ? maxWidth / width : 1,
            maxHeight ? maxHeight / height : 1
          );
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // Draw the image with new dimensions
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with specified quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
    });
  }
  
  static calculateCompressionRatio(originalSize: number, compressedSize: number): number {
    return Math.round((1 - compressedSize / originalSize) * 100);
  }
  
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}