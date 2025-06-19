import { useState } from "react";
import { FileItem, ConvertedFile } from "@/types/file";
import { ImageResizer } from "@/lib/image-resizer";
import { ImageConverter } from "@/lib/image-converter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUpload from "@/components/file-upload";
import ConversionResults from "@/components/conversion-results";

export default function Resize() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [percentage, setPercentage] = useState(50);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizeMode, setResizeMode] = useState<'pixels' | 'percentage'>('pixels');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFilesAdded = (newFiles: FileItem[]) => {
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "이미지가 선택되었습니다",
      description: "크기 조절 설정을 조정하고 크기 조절 시작을 눌러주세요",
    });
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleResizeAll = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "크기를 조절할 파일이 없습니다",
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

        let resizedBlob: Blob;
        
        if (resizeMode === 'percentage') {
          resizedBlob = await ImageResizer.resizeByPercentage(fileItem.file, percentage);
        } else {
          resizedBlob = await ImageResizer.resizeImage(fileItem.file, width, height, maintainAspectRatio);
        }

        const convertedName = fileItem.file.name.replace(/(\.[^/.]+)$/, `_resized$1`);
        
        const convertedFile: ConvertedFile = {
          id: fileItem.id,
          originalName: fileItem.file.name,
          convertedName,
          blob: resizedBlob,
          size: resizedBlob.size,
          downloadUrl: URL.createObjectURL(resizedBlob)
        };

        newConvertedFiles.push(convertedFile);
        
        setSelectedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { ...f, status: 'converted' as const } : f)
        );

        toast({
          title: "크기 조절 완료",
          description: `${fileItem.file.name} 크기가 조절되었습니다`,
        });
      }

      setConvertedFiles(prev => [...prev, ...newConvertedFiles]);

    } catch (error) {
      toast({
        title: "크기 조절 실패",
        description: error instanceof Error ? error.message : "크기 조절 중 오류가 발생했습니다.",
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
      description: "선택된 파일과 크기 조절 결과가 모두 제거되었습니다.",
    });
  };

  const presetSizes = [
    { name: "소셜 미디어 (1080x1080)", width: 1080, height: 1080 },
    { name: "Facebook 커버 (820x312)", width: 820, height: 312 },
    { name: "Instagram 스토리 (1080x1920)", width: 1080, height: 1920 },
    { name: "YouTube 썸네일 (1280x720)", width: 1280, height: 720 },
    { name: "웹 이미지 (800x600)", width: 800, height: 600 },
    { name: "아이콘 (512x512)", width: 512, height: 512 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-custom rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-expand-arrows-alt text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">이미지 크기 조절</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            이미지 크기를 원하는 픽셀 크기나 비율로 조절하세요. 다양한 플랫폼에 맞는 프리셋도 제공합니다.
          </p>
        </div>

        <div className="space-y-6">
          <FileUpload onFilesAdded={handleFilesAdded} />
          
          {selectedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-sliders-h mr-2"></i>
                  크기 조절 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={resizeMode} onValueChange={(value) => setResizeMode(value as 'pixels' | 'percentage')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pixels">픽셀 단위</TabsTrigger>
                    <TabsTrigger value="percentage">비율 단위</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pixels" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">가로 (px)</label>
                        <Input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Number(e.target.value))}
                          min={1}
                          max={10000}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">세로 (px)</label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          min={1}
                          max={10000}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={maintainAspectRatio}
                        onCheckedChange={setMaintainAspectRatio}
                      />
                      <label className="text-sm font-medium text-gray-700">
                        비율 유지
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">프리셋 크기</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {presetSizes.map((preset) => (
                          <Button
                            key={preset.name}
                            variant="ghost"
                            size="sm"
                            className="justify-start text-left h-auto p-3 border border-gray-200 hover:border-primary-custom"
                            onClick={() => {
                              setWidth(preset.width);
                              setHeight(preset.height);
                            }}
                          >
                            <div>
                              <div className="font-medium text-sm">{preset.name}</div>
                              <div className="text-xs text-gray-500">{preset.width} × {preset.height}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="percentage" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        크기 비율: {percentage}%
                      </label>
                      <Input
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(Number(e.target.value))}
                        min={1}
                        max={500}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        원본 크기 대비 비율 (100% = 원본 크기)
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between">
                  <Button
                    onClick={handleResizeAll}
                    disabled={isProcessing}
                    className="bg-primary-custom hover:bg-primary-custom-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                  >
                    <i className="fas fa-expand-arrows-alt"></i>
                    <span>{isProcessing ? '크기 조절 중...' : '크기 조절 시작'}</span>
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
                           fileItem.status === 'converting' ? '조절중' :
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