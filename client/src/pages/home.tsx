import { useState } from "react";
import { FileItem, ConvertedFile } from "@/types/file";
import { ImageConverter } from "@/lib/image-converter";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUpload from "@/components/file-upload";
import FileList from "@/components/file-list";
import ConversionResults from "@/components/conversion-results";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const { toast } = useToast();

  const handleFilesAdded = (newFiles: FileItem[]) => {
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    // Show confirmation toast
    toast({
      title: "이미지가 선택되었습니다",
      description: "아래에서 이미지를 확인후 모두변환을 눌러주세요",
    });
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleConvertSingle = async (fileId: string) => {
    const fileItem = selectedFiles.find(f => f.id === fileId);
    if (!fileItem) return;

    // Update status to converting
    setSelectedFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, status: 'converting' as const } : f)
    );

    try {
      const convertedBlob = await ImageConverter.convertToJPG(fileItem.file);
      const convertedName = fileItem.file.name.replace(/\.[^/.]+$/, '.jpg');
      
      const convertedFile: ConvertedFile = {
        id: fileItem.id,
        originalName: fileItem.file.name,
        convertedName,
        blob: convertedBlob,
        size: convertedBlob.size,
        downloadUrl: URL.createObjectURL(convertedBlob)
      };

      setConvertedFiles(prev => [...prev, convertedFile]);
      
      // Update status to converted
      setSelectedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, status: 'converted' as const } : f)
      );

      toast({
        title: "변환 완료",
        description: `${fileItem.file.name}이(가) JPG로 변환되었습니다.`,
      });

    } catch (error) {
      setSelectedFiles(prev => 
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: 'error' as const, 
          error: error instanceof Error ? error.message : '변환 중 오류가 발생했습니다.'
        } : f)
      );

      toast({
        title: "변환 실패",
        description: `${fileItem.file.name} 변환 중 오류가 발생했습니다.`,
        variant: "destructive"
      });
    }
  };

  const handleConvertAll = async () => {
    const pendingFiles = selectedFiles.filter(f => f.status === 'pending');
    
    if (pendingFiles.length === 0) {
      toast({
        title: "변환할 파일이 없습니다",
        description: "대기 중인 파일이 없습니다.",
        variant: "destructive"
      });
      return;
    }

    // Convert files one by one to avoid overwhelming the browser
    for (const fileItem of pendingFiles) {
      await handleConvertSingle(fileItem.id);
      // Small delay between conversions
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    setConvertedFiles([]);
    
    toast({
      title: "모든 파일 제거됨",
      description: "선택된 파일과 변환 결과가 모두 제거되었습니다.",
    });
  };

  const handleDownloadAll = () => {
    // This is handled by the ConversionResults component
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-custom rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-file-image text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">이미지를 JPG로 변환</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            PNG, BMP, GIF, TIFF, WEBP 등 다양한 이미지 형식을 고품질 JPG로 변환하세요. 
            빠르고 안전하며 완전 무료입니다.
          </p>
        </div>

        {/* File Upload Area */}
        <div className="space-y-6">
          <FileUpload onFilesAdded={handleFilesAdded} />
        </div>

        {/* Selected Files Display directly below the description */}
        {selectedFiles.length > 0 && (
          <div className="mt-8">
            <FileList
              files={selectedFiles}
              onRemoveFile={handleRemoveFile}
              onConvertSingle={handleConvertSingle}
              onConvertAll={handleConvertAll}
              onClearAll={handleClearAll}
            />
          </div>
        )}
        
        {/* Conversion Results */}
        {convertedFiles.length > 0 && (
          <div className="mt-6">
            <ConversionResults
              convertedFiles={convertedFiles}
              onDownloadAll={handleDownloadAll}
            />
          </div>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 mt-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Fast conversion" 
              className="mx-auto w-16 h-16 object-cover rounded-lg mb-4" 
            />
            <h4 className="font-semibold text-gray-900 mb-2">빠른 변환</h4>
            <p className="text-gray-600 text-sm">클라이언트 측에서 처리되어 빠르고 안전합니다</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Batch processing" 
              className="mx-auto w-16 h-16 object-cover rounded-lg mb-4" 
            />
            <h4 className="font-semibold text-gray-900 mb-2">일괄 처리</h4>
            <p className="text-gray-600 text-sm">여러 파일을 한 번에 변환할 수 있습니다</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Privacy and security" 
              className="mx-auto w-16 h-16 object-cover rounded-lg mb-4" 
            />
            <h4 className="font-semibold text-gray-900 mb-2">완전 무료</h4>
            <p className="text-gray-600 text-sm">서버에 업로드 없이 브라우저에서 처리됩니다</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
