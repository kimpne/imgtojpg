export interface FileItem {
  id: string;
  file: File;
  status: 'pending' | 'converting' | 'converted' | 'error';
  preview?: string;
  error?: string;
}

export interface ConvertedFile {
  id: string;
  originalName: string;
  convertedName: string;
  blob: Blob;
  size: number;
  downloadUrl: string;
}

export interface ConversionProgress {
  fileId: string;
  progress: number;
  status: string;
}
