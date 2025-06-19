import { FileItem } from "@/types/file";
import { ImageConverter } from "@/lib/image-converter";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileListProps {
  files: FileItem[];
  onRemoveFile: (fileId: string) => void;
  onConvertSingle: (fileId: string) => void;
  onConvertAll: () => void;
  onClearAll: () => void;
}

export default function FileList({
  files,
  onRemoveFile,
  onConvertSingle,
  onConvertAll,
  onClearAll
}: FileListProps) {
  const { t } = useLanguage();
  
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
          <i className="fas fa-list mr-2"></i>
          {t('files.selected')} (<span>{files.length}</span>)
        </h3>
        <div className="flex space-x-3">
          <Button
            onClick={onConvertAll}
            className="bg-primary-custom hover:bg-primary-custom-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <i className="fas fa-sync-alt"></i>
            <span>{t('files.convertAll')}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <i className="fas fa-trash-alt mr-1"></i>
            {t('files.removeAll')}
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {files.map((fileItem) => (
          <FileListItem
            key={fileItem.id}
            fileItem={fileItem}
            onRemove={() => onRemoveFile(fileItem.id)}
            onConvert={() => onConvertSingle(fileItem.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface FileListItemProps {
  fileItem: FileItem;
  onRemove: () => void;
  onConvert: () => void;
}

function FileListItem({ fileItem, onRemove, onConvert }: FileListItemProps) {
  const { t } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'converting':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'converted':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('files.pending');
      case 'converting':
        return t('files.converting');
      case 'converted':
        return t('files.converted');
      case 'error':
        return t('files.error');
      default:
        return status;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
          {fileItem.preview ? (
            <img 
              src={fileItem.preview} 
              alt="Preview" 
              className="w-full h-full object-cover rounded" 
            />
          ) : fileItem.file.type === 'application/pdf' ? (
            <i className="fas fa-file-pdf text-red-500"></i>
          ) : (
            <i className="fas fa-image text-gray-400 dark:text-gray-500"></i>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate">{fileItem.file.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ImageConverter.formatFileSize(fileItem.file.size)} • {ImageConverter.getFileExtension(fileItem.file.name)}
          </p>
          {fileItem.status === 'converting' && (
            <div className="mt-2">
              <Progress value={50} className="h-2" />
            </div>
          )}
          {fileItem.error && (
            <p className="text-sm text-red-600 mt-1">{fileItem.error}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(fileItem.status)}`}>
            {getStatusText(fileItem.status)}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
            {ImageConverter.getFileExtension(fileItem.file.name)} → JPG
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        {fileItem.status === 'pending' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onConvert}
            className="text-primary-custom hover:text-primary-custom hover:bg-blue-50 p-2 rounded-lg transition-colors"
            title="변환"
          >
            <i className="fas fa-sync-alt"></i>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-gray-400 dark:text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
          title="제거"
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </div>
    </div>
  );
}
