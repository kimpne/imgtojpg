import { useState } from "react";
import { FileItem, ConvertedFile } from "@/types/file";
import { ImageCropper, CropArea } from "@/lib/image-cropper";
import { ImageConverter } from "@/lib/image-converter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUpload from "@/components/file-upload";
import ConversionResults from "@/components/conversion-results";

export default function Crop() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [cropMode, setCropMode] = useState<'ratio' | 'square' | 'custom'>('ratio');
  const [cropRatio, setCropRatio] = useState('16:9');
  const [customCrop, setCustomCrop] = useState<CropArea>({ x: 0, y: 0, width: 500, height: 500 });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFilesAdded = (newFiles: FileItem[]) => {
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "이미지가 선택되었습니다",
      description: "자르기 설정을 조정하고 자르기 시작을 눌러주세요",
    });
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleCropAll = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "자를 파일이 없습니다",
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

        let croppedBlob: Blob;
        
        if (cropMode === 'square') {
          croppedBlob = await ImageCropper.cropToSquare(fileItem.file);
        } else if (cropMode === 'ratio') {
          croppedBlob = await ImageCropper.cropToRatio(fileItem.file, cropRatio);
        } else {
          croppedBlob = await ImageCropper.cropImage(fileItem.file, customCrop);
        }

        const convertedName = fileItem.file.name.replace(/(\.[^/.]+)$/, `_cropped$1`);
        
        const convertedFile: ConvertedFile = {
          id: fileItem.id,
          originalName: fileItem.file.name,
          convertedName,
          blob: croppedBlob,
          size: croppedBlob.size,
          downloadUrl: URL.createObjectURL(croppedBlob)
        };

        newConvertedFiles.push(convertedFile);
        
        setSelectedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { ...f, status: 'converted' as const } : f)
        );

        toast({
          title: "자르기 완료",
          description: `${fileItem.file.name}이 잘라졌습니다`,
        });
      }

      setConvertedFiles(prev => [...prev, ...newConvertedFiles]);

    } catch (error) {
      toast({
        title: "자르기 실패",
        description: error instanceof Error ? error.message : "자르기 중 오류가 발생했습니다.",
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
      description: "선택된 파일과 자르기 결과가 모두 제거되었습니다.",
    });
  };

  const aspectRatios = [
    { name: "16:9 (와이드)", value: "16:9" },
    { name: "4:3 (일반)", value: "4:3" },
    { name: "3:2 (카메라)", value: "3:2" },
    { name: "9:16 (세로)", value: "9:16" },
    { name: "1:1 (정사각형)", value: "1:1" },
    { name: "2:1 (파노라마)", value: "2:1" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-custom rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-crop-alt text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">이미지 잘라내기</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            이미지를 원하는 비율이나 크기로 잘라내세요. 다양한 비율 옵션과 사용자 정의 자르기를 지원합니다.
          </p>
        </div>

        <div className="space-y-6">
          <FileUpload onFilesAdded={handleFilesAdded} />
          
          {selectedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-sliders-h mr-2"></i>
                  자르기 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={cropMode} onValueChange={(value) => setCropMode(value as 'ratio' | 'square' | 'custom')}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ratio">비율 자르기</TabsTrigger>
                    <TabsTrigger value="square">정사각형</TabsTrigger>
                    <TabsTrigger value="custom">사용자 정의</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ratio" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">비율 선택</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {aspectRatios.map((ratio) => (
                          <Button
                            key={ratio.value}
                            variant={cropRatio === ratio.value ? "default" : "ghost"}
                            size="sm"
                            className="justify-start text-left h-auto p-3 border border-gray-200"
                            onClick={() => setCropRatio(ratio.value)}
                          >
                            <div>
                              <div className="font-medium text-sm">{ratio.name}</div>
                              <div className="text-xs text-gray-500">{ratio.value}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="square" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <i className="fas fa-square text-blue-500 mr-2"></i>
                        <p className="text-sm text-blue-700">
                          이미지를 가장 작은 치수에 맞춰 정사각형으로 자릅니다.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="custom" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">시작 X 위치</label>
                        <Input
                          type="number"
                          value={customCrop.x}
                          onChange={(e) => setCustomCrop(prev => ({ ...prev, x: Number(e.target.value) }))}
                          min={0}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">시작 Y 위치</label>
                        <Input
                          type="number"
                          value={customCrop.y}
                          onChange={(e) => setCustomCrop(prev => ({ ...prev, y: Number(e.target.value) }))}
                          min={0}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">가로 크기</label>
                        <Input
                          type="number"
                          value={customCrop.width}
                          onChange={(e) => setCustomCrop(prev => ({ ...prev, width: Number(e.target.value) }))}
                          min={1}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">세로 크기</label>
                        <Input
                          type="number"
                          value={customCrop.height}
                          onChange={(e) => setCustomCrop(prev => ({ ...prev, height: Number(e.target.value) }))}
                          min={1}
                        />
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                        <p className="text-sm text-yellow-700">
                          사용자 정의 자르기는 이미지 크기를 초과하지 않도록 주의하세요.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between">
                  <Button
                    onClick={handleCropAll}
                    disabled={isProcessing}
                    className="bg-primary-custom hover:bg-primary-custom-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                  >
                    <i className="fas fa-crop-alt"></i>
                    <span>{isProcessing ? '자르는 중...' : '자르기 시작'}</span>
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
                           fileItem.status === 'converting' ? '자르는중' :
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