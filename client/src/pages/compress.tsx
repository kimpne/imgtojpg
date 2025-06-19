import { useState } from "react";
import { FileItem, ConvertedFile } from "@/types/file";
import { ImageCompressor } from "@/lib/image-compressor";
import { ImageConverter } from "@/lib/image-converter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUpload from "@/components/file-upload";
import ConversionResults from "@/components/conversion-results";

export default function Compress() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [quality, setQuality] = useState([80]);
  const [maxWidth, setMaxWidth] = useState([2048]);
  const [maxHeight, setMaxHeight] = useState([2048]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFilesAdded = (newFiles: FileItem[]) => {
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "이미지가 선택되었습니다",
      description: "압축 설정을 조정하고 압축 시작을 눌러주세요",
    });
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleCompressAll = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "압축할 파일이 없습니다",
        description: "먼저 이미지를 선택해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    const newConvertedFiles: ConvertedFile[] = [];

    try {
      for (const fileItem of selectedFiles) {
        setSelectedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { ...f, status: 'converting' as const } : f)
        );

        const compressedBlob = await ImageCompressor.compressImage(
          fileItem.file,
          quality[0] / 100,
          maxWidth[0],
          maxHeight[0]
        );

        const compressionRatio = ImageCompressor.calculateCompressionRatio(
          fileItem.file.size,
          compressedBlob.size
        );

        const convertedName = fileItem.file.name.replace(/(\.[^/.]+)$/, `_compressed$1`);
        
        const convertedFile: ConvertedFile = {
          id: fileItem.id,
          originalName: fileItem.file.name,
          convertedName,
          blob: compressedBlob,
          size: compressedBlob.size,
          downloadUrl: URL.createObjectURL(compressedBlob)
        };

        newConvertedFiles.push(convertedFile);
        
        setSelectedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { ...f, status: 'converted' as const } : f)
        );

        toast({
          title: "압축 완료",
          description: `${fileItem.file.name} - ${compressionRatio}% 용량 감소`,
        });
      }

      setConvertedFiles(prev => [...prev, ...newConvertedFiles]);

    } catch (error) {
      toast({
        title: "압축 실패",
        description: error instanceof Error ? error.message : "압축 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    setConvertedFiles([]);
    
    toast({
      title: "모든 파일 제거됨",
      description: "선택된 파일과 압축 결과가 모두 제거되었습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-custom rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-compress-alt text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">이미지 압축</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            이미지 품질을 유지하면서 파일 크기를 줄여보세요. 빠르고 효율적인 압축으로 저장 공간을 절약하세요.
          </p>
        </div>

        <div className="space-y-6">
          <FileUpload onFilesAdded={handleFilesAdded} />
          
          {selectedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-sliders-h mr-2"></i>
                  압축 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    압축 품질: {quality[0]}%
                  </label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    높을수록 품질이 좋지만 파일 크기가 커집니다
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      최대 가로: {maxWidth[0]}px
                    </label>
                    <Slider
                      value={maxWidth}
                      onValueChange={setMaxWidth}
                      max={4096}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      최대 세로: {maxHeight[0]}px
                    </label>
                    <Slider
                      value={maxHeight}
                      onValueChange={setMaxHeight}
                      max={4096}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={handleCompressAll}
                    disabled={isProcessing}
                    className="bg-primary-custom hover:bg-primary-custom-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                  >
                    <i className="fas fa-compress-alt"></i>
                    <span>{isProcessing ? '압축 중...' : '압축 시작'}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleClearAll}
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <i className="fas fa-trash-alt mr-1"></i>
                    모두 제거
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedFiles.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-list mr-2"></i>
                선택된 파일 ({selectedFiles.length})
              </h3>
              <div className="space-y-3">
                {selectedFiles.map((fileItem) => (
                  <div key={fileItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {fileItem.preview ? (
                          <img src={fileItem.preview} alt="Preview" className="w-full h-full object-cover rounded" />
                        ) : (
                          <i className="fas fa-image text-gray-400"></i>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{fileItem.file.name}</p>
                        <p className="text-sm text-gray-500">
                          {ImageConverter.formatFileSize(fileItem.file.size)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          fileItem.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                          fileItem.status === 'converting' ? 'bg-yellow-100 text-yellow-800' :
                          fileItem.status === 'converted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {fileItem.status === 'pending' ? '대기중' :
                           fileItem.status === 'converting' ? '압축중' :
                           fileItem.status === 'converted' ? '완료' : '오류'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(fileItem.id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors ml-4"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {convertedFiles.length > 0 && (
            <ConversionResults
              convertedFiles={convertedFiles}
              onDownloadAll={() => {}}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}