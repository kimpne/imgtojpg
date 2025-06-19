import { ConvertedFile } from "@/types/file";
import { ImageConverter } from "@/lib/image-converter";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ConversionResultsProps {
  convertedFiles: ConvertedFile[];
  onDownloadAll: () => void;
}

export default function ConversionResults({ convertedFiles, onDownloadAll }: ConversionResultsProps) {
  const { t } = useLanguage();
  
  if (convertedFiles.length === 0) {
    return null;
  }

  const downloadFile = (file: ConvertedFile) => {
    const a = document.createElement('a');
    a.href = file.downloadUrl;
    a.download = file.convertedName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();
    
    for (const file of convertedFiles) {
      zip.file(file.convertedName, file.blob);
    }
    
    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "converted-images.zip");
    } catch (error) {
      console.error('Error creating ZIP file:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
          <i className="fas fa-check-circle text-success-custom mr-2"></i>
          {t('files.conversionComplete')}
        </h3>
        <Button
          onClick={downloadAllAsZip}
          className="bg-success-custom hover:bg-success-custom-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <i className="fas fa-download"></i>
          <span>{t('files.downloadAll')}</span>
        </Button>
      </div>
      
      <div className="space-y-3">
        {convertedFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 bg-success-custom bg-opacity-10 dark:bg-opacity-20 rounded-lg flex items-center justify-center">
                <i className="fas fa-check text-success-custom"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{file.convertedName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ImageConverter.formatFileSize(file.size)} • JPG
                </p>
              </div>
            </div>
            <Button
              onClick={() => downloadFile(file)}
              className="bg-primary-custom hover:bg-primary-custom-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <i className="fas fa-download"></i>
              <span>{t('files.download')}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
