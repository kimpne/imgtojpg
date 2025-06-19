import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    // Header
    "header.title": "ImageConverter",
    "header.subtitle": "무료 이미지 변환 도구",
    "header.convert": "변환 도구",
    "header.compress": "압축",
    "header.resize": "이미지크기조절",
    "header.crop": "이미지 잘라내기",
    "header.help": "도움말",
    
    // Home page
    "home.title": "이미지를 JPG로 변환",
    "home.subtitle": "PNG, BMP, GIF, TIFF, WEBP, PDF 등 다양한 형식을 고품질 JPG로 변환하세요. 빠르고 안전하며 완전 무료입니다.",
    "home.selectImages": "이미지 선택",
    "home.dragDrop": "또는 파일을 여기로 드래그 앤 드롭",
    "home.supportedFormats": "PNG, BMP, GIF, TIFF, WEBP, PDF 형식 지원 (최대 50MB)",
    "home.supportedFormatsTitle": "지원되는 형식",
    
    // File operations
    "files.selected": "선택된 파일",
    "files.convertAll": "모두 변환",
    "files.removeAll": "모두 제거",
    "files.pending": "대기중",
    "files.converting": "변환중",
    "files.converted": "완료",
    "files.error": "오류",
    "files.download": "다운로드",
    "files.downloadAll": "ZIP으로 모두 다운로드",
    "files.conversionComplete": "변환 완료",
    
    // Toasts
    "toast.filesSelected": "이미지가 선택되었습니다",
    "toast.checkAndConvert": "아래에서 이미지를 확인후 모두변환을 눌러주세요",
    "toast.conversionComplete": "변환 완료",
    "toast.conversionFailed": "변환 실패",
    "toast.filesCleared": "모든 파일 제거됨",
    "toast.filesClearedDesc": "선택된 파일과 변환 결과가 모두 제거되었습니다.",
    "toast.invalidFiles": "일부 파일이 제외되었습니다",
    "toast.invalidFilesDesc": "개의 파일이 지원되지 않는 형식이거나 크기가 너무 큽니다.",
    
    // Compress page
    "compress.title": "이미지 압축",
    "compress.subtitle": "이미지 품질을 유지하면서 파일 크기를 줄여보세요. 빠르고 효율적인 압축으로 저장 공간을 절약하세요.",
    "compress.settings": "압축 설정",
    "compress.quality": "압축 품질",
    "compress.qualityDesc": "높을수록 품질이 좋지만 파일 크기가 커집니다",
    "compress.maxWidth": "최대 가로",
    "compress.maxHeight": "최대 세로",
    "compress.start": "압축 시작",
    "compress.processing": "압축 중...",
    
    // Resize page
    "resize.title": "이미지 크기 조절",
    "resize.subtitle": "이미지 크기를 원하는 픽셀 크기나 비율로 조절하세요. 다양한 플랫폼에 맞는 프리셋도 제공합니다.",
    "resize.settings": "크기 조절 설정",
    "resize.pixels": "픽셀 단위",
    "resize.percentage": "비율 단위",
    "resize.width": "가로 (px)",
    "resize.height": "세로 (px)",
    "resize.maintainRatio": "비율 유지",
    "resize.presets": "프리셋 크기",
    "resize.start": "크기 조절 시작",
    "resize.processing": "크기 조절 중...",
    
    // Crop page
    "crop.title": "이미지 잘라내기",
    "crop.subtitle": "이미지를 원하는 비율이나 크기로 잘라내세요. 다양한 비율 옵션과 사용자 정의 자르기를 지원합니다.",
    "crop.settings": "자르기 설정",
    "crop.ratio": "비율 자르기",
    "crop.square": "정사각형",
    "crop.custom": "사용자 정의",
    "crop.start": "자르기 시작",
    "crop.processing": "자르는 중...",
    
    // Features
    "features.fast": "빠른 변환",
    "features.fastDesc": "클라이언트 측에서 처리되어 빠르고 안전합니다",
    "features.batch": "일괄 처리",
    "features.batchDesc": "여러 파일을 한 번에 변환할 수 있습니다",
    "features.free": "완전 무료",
    "features.freeDesc": "서버에 업로드 없이 브라우저에서 처리됩니다",
    
    // Footer
    "footer.description": "무료 이미지 변환 및 편집 도구로 모든 이미지 작업을 간편하게 처리하세요.",
    "footer.conversionTools": "변환 도구",
    "footer.jpgConvert": "JPG 변환",
    "footer.pngConvert": "PNG 변환",
    "footer.webpConvert": "WEBP 변환",
    "footer.pdfConvert": "PDF 변환",
    "footer.editTools": "편집 도구",
    "footer.imageCompress": "이미지 압축",
    "footer.resize": "크기 조정",
    "footer.crop": "자르기",
    "footer.rotate": "회전",
    "footer.support": "지원",
    "footer.help": "도움말",
    "footer.contact": "문의하기",
    "footer.privacy": "개인정보처리방침",
    "footer.terms": "이용약관",
    "footer.copyright": "© 2024 ImageConverter. All rights reserved.",
  },
  en: {
    // Header
    "header.title": "ImageConverter",
    "header.subtitle": "Free Image Conversion Tool",
    "header.convert": "Convert",
    "header.compress": "Compress",
    "header.resize": "Resize",
    "header.crop": "Crop",
    "header.help": "Help",
    
    // Home page
    "home.title": "Convert Images to JPG",
    "home.subtitle": "Convert PNG, BMP, GIF, TIFF, WEBP, PDF and more to high-quality JPG. Fast, secure, and completely free.",
    "home.selectImages": "Select Images",
    "home.dragDrop": "or drag and drop files here",
    "home.supportedFormats": "Supports PNG, BMP, GIF, TIFF, WEBP, PDF formats (max 50MB)",
    "home.supportedFormatsTitle": "Supported Formats",
    
    // File operations
    "files.selected": "Selected Files",
    "files.convertAll": "Convert All",
    "files.removeAll": "Remove All",
    "files.pending": "Pending",
    "files.converting": "Converting",
    "files.converted": "Completed",
    "files.error": "Error",
    "files.download": "Download",
    "files.downloadAll": "Download All as ZIP",
    "files.conversionComplete": "Conversion Complete",
    
    // Toasts
    "toast.filesSelected": "Images selected",
    "toast.checkAndConvert": "Check the images below and click Convert All",
    "toast.conversionComplete": "Conversion complete",
    "toast.conversionFailed": "Conversion failed",
    "toast.filesCleared": "All files removed",
    "toast.filesClearedDesc": "All selected files and conversion results have been removed.",
    "toast.invalidFiles": "Some files were excluded",
    "toast.invalidFilesDesc": " files are not supported or too large.",
    
    // Compress page
    "compress.title": "Image Compression",
    "compress.subtitle": "Reduce file size while maintaining image quality. Save storage space with fast and efficient compression.",
    "compress.settings": "Compression Settings",
    "compress.quality": "Compression Quality",
    "compress.qualityDesc": "Higher values provide better quality but larger file size",
    "compress.maxWidth": "Max Width",
    "compress.maxHeight": "Max Height",
    "compress.start": "Start Compression",
    "compress.processing": "Compressing...",
    
    // Resize page
    "resize.title": "Image Resize",
    "resize.subtitle": "Resize images to your desired pixel dimensions or percentage. Includes presets for various platforms.",
    "resize.settings": "Resize Settings",
    "resize.pixels": "Pixels",
    "resize.percentage": "Percentage",
    "resize.width": "Width (px)",
    "resize.height": "Height (px)",
    "resize.maintainRatio": "Maintain Aspect Ratio",
    "resize.presets": "Preset Sizes",
    "resize.start": "Start Resize",
    "resize.processing": "Resizing...",
    
    // Crop page
    "crop.title": "Image Crop",
    "crop.subtitle": "Crop images to desired aspect ratios or custom dimensions. Supports various ratio options and custom cropping.",
    "crop.settings": "Crop Settings",
    "crop.ratio": "Aspect Ratio",
    "crop.square": "Square",
    "crop.custom": "Custom",
    "crop.start": "Start Crop",
    "crop.processing": "Cropping...",
    
    // Features
    "features.fast": "Fast Conversion",
    "features.fastDesc": "Processed client-side for speed and security",
    "features.batch": "Batch Processing",
    "features.batchDesc": "Convert multiple files at once",
    "features.free": "Completely Free",
    "features.freeDesc": "Processed in your browser without server upload",
    
    // Footer
    "footer.description": "Free image conversion and editing tools to handle all your image processing needs easily.",
    "footer.conversionTools": "Conversion Tools",
    "footer.jpgConvert": "JPG Convert",
    "footer.pngConvert": "PNG Convert",
    "footer.webpConvert": "WEBP Convert",
    "footer.pdfConvert": "PDF Convert",
    "footer.editTools": "Edit Tools",
    "footer.imageCompress": "Image Compression",
    "footer.resize": "Resize",
    "footer.crop": "Crop",
    "footer.rotate": "Rotate",
    "footer.support": "Support",
    "footer.help": "Help",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.copyright": "© 2024 ImageConverter. All rights reserved.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "ko";
  });

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}