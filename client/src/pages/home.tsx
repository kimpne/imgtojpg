import { useState } from "react";
import { FileItem, ConvertedFile } from "@/types/file";
import { ImageConverter } from "@/lib/image-converter";
import { PDFConverter } from "@/lib/pdf-converter";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUpload from "@/components/file-upload";
import FileList from "@/components/file-list";
import ConversionResults from "@/components/conversion-results";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFilesAdded = (newFiles: FileItem[]) => {
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    // Show confirmation toast
    toast({
      title: t('toast.filesSelected'),
      description: t('toast.checkAndConvert'),
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
      let convertedBlob: Blob;
      let convertedName: string;

      if (fileItem.file.type === 'application/pdf') {
        // Convert PDF to JPG
        convertedBlob = await PDFConverter.convertPDFToSingleJPG(fileItem.file);
        convertedName = fileItem.file.name.replace(/\.pdf$/i, '.jpg');
      } else {
        // Convert image to JPG
        convertedBlob = await ImageConverter.convertToJPG(fileItem.file);
        convertedName = fileItem.file.name.replace(/\.[^/.]+$/, '.jpg');
      }
      
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
        title: t('toast.conversionComplete'),
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
        title: t('toast.conversionFailed'),
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
      title: t('toast.filesCleared'),
      description: t('toast.filesClearedDesc'),
    });
  };

  const handleDownloadAll = () => {
    // This is handled by the ConversionResults component
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-custom rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-file-image text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('home.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.subtitle')}
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Fast conversion" 
              className="mx-auto w-16 h-16 object-cover rounded-lg mb-4" 
            />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('features.fast')}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('features.fastDesc')}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Batch processing" 
              className="mx-auto w-16 h-16 object-cover rounded-lg mb-4" 
            />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('features.batch')}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('features.batchDesc')}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
              alt="Privacy and security" 
              className="mx-auto w-16 h-16 object-cover rounded-lg mb-4" 
            />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('features.free')}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('features.freeDesc')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
