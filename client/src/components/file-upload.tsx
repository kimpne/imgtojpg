import { useCallback, useState } from "react";
import { FileItem } from "@/types/file";
import { ImageConverter } from "@/lib/image-converter";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFilesAdded: (files: FileItem[]) => void;
}

export default function FileUpload({ onFilesAdded }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }, []);

  const processFiles = async (files: File[]) => {
    const validFiles: FileItem[] = [];
    let invalidCount = 0;

    for (const file of files) {
      if (ImageConverter.isValidImageFile(file)) {
        const fileItem: FileItem = {
          id: Date.now() + Math.random().toString(),
          file,
          status: 'pending'
        };
        
        try {
          fileItem.preview = await ImageConverter.generatePreview(file);
        } catch (error) {
          console.warn('Failed to generate preview for', file.name);
        }
        
        validFiles.push(fileItem);
      } else {
        invalidCount++;
      }
    }

    if (invalidCount > 0) {
      toast({
        title: "일부 파일이 제외되었습니다",
        description: `${invalidCount}개의 파일이 지원되지 않는 형식이거나 크기가 너무 큽니다.`,
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      onFilesAdded(validFiles);
    }
  };

  const supportedFormats = [
    { name: 'PNG', icon: 'fas fa-file-image' },
    { name: 'BMP', icon: 'fas fa-file-image' },
    { name: 'GIF', icon: 'fas fa-file-image' },
    { name: 'TIFF', icon: 'fas fa-file-image' },
    { name: 'WEBP', icon: 'fas fa-file-image' },
    { name: 'SVG', icon: 'fas fa-file-image' }
  ];

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div 
        className={`bg-white rounded-xl shadow-sm border-2 border-dashed transition-colors duration-200 ${
          isDragOver ? 'border-primary-custom bg-blue-50' : 'border-gray-300 hover:border-primary-custom'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Upload illustration" 
              className="mx-auto w-20 h-20 object-cover rounded-lg opacity-60" 
            />
          </div>
          
          <div className="mb-4">
            <button 
              onClick={() => document.getElementById('fileInput')?.click()}
              className="bg-primary-custom hover:bg-primary-custom-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <i className="fas fa-plus"></i>
              <span>이미지 선택</span>
            </button>
          </div>
          
          <p className="text-gray-500 mb-2">또는 파일을 여기로 드래그 앤 드롭</p>
          <p className="text-sm text-gray-400">PNG, BMP, GIF, TIFF, WEBP 형식 지원 (최대 10MB)</p>
          
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {/* Supported Formats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-check-circle text-success-custom mr-2"></i>
          지원되는 형식
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {supportedFormats.map((format) => (
            <div 
              key={format.name}
              className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
            >
              <i className={`${format.icon} text-primary-custom`}></i>
              <span className="font-medium text-sm">{format.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
