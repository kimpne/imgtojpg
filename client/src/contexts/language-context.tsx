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
    
    // Privacy Policy
    "privacy.title": "개인정보처리방침",
    "privacy.intro": "본 사이트는 사용자 개인정보 보호를 최우선으로 생각합니다. 본 방침은 이미지 변환 서비스 이용과 관련하여 적용됩니다.",
    "privacy.section1.title": "1. 개인정보 수집 항목",
    "privacy.section1.content": "본 사이트는 어떠한 개인정보도 수집하지 않습니다.",
    "privacy.section2.title": "2. 이미지 처리 및 저장",
    "privacy.section2.content": "사용자가 업로드한 모든 이미지는 오직 브라우저 내에서만 처리되며, 서버에 저장되지 않습니다. 변환 후 이미지 파일은 즉시 다운로드되며 어떠한 기록도 남기지 않습니다.",
    "privacy.section3.title": "3. 제3자 제공",
    "privacy.section3.content": "본 사이트는 개인정보를 수집하지 않으며, 따라서 제3자에게 제공하지 않습니다.",
    "privacy.section4.title": "4. 쿠키 및 추적 기술",
    "privacy.section4.content": "쿠키, 웹 비콘, 트래킹 기술을 사용하지 않으며 광고 및 사용자 분석 목적의 도구도 사용하지 않습니다.",
    "privacy.effectiveDate": "본 방침은 2024년 6월 19일부터 적용됩니다.",
    
    // Terms of Service
    "terms.title": "이용약관",
    "terms.intro": "본 약관은 이미지 변환 웹사이트(이하 \"사이트\")를 이용함에 있어 필요한 조건과 책임에 대해 규정합니다.",
    "terms.section1.title": "1. 서비스 개요",
    "terms.section1.content": "본 사이트는 사용자가 PNG, BMP, GIF, WEBP 등의 이미지 파일을 JPG 등으로 변환, 압축, 크기 조절, 자르기 등의 기능을 브라우저 상에서 수행할 수 있도록 돕는 서비스입니다.",
    "terms.section2.title": "2. 이용자의 책임",
    "terms.section2.item1": "사용자는 타인의 저작권, 초상권, 개인정보를 침해하지 않는 이미지만 업로드해야 합니다.",
    "terms.section2.item2": "업로드된 이미지에 대한 모든 법적 책임은 사용자에게 있습니다.",
    "terms.section3.title": "3. 금지 행위",
    "terms.section3.item1": "불법 콘텐츠 포함 이미지 업로드",
    "terms.section3.item2": "자동화된 방식으로 과도한 요청을 전송하는 행위",
    "terms.section4.title": "4. 면책 조항",
    "terms.section4.content": "본 사이트는 사용자 이미지 손상, 오작동, 또는 데이터 손실 등에 대해 법적 책임을 지지 않으며, 서비스는 \"있는 그대로\" 제공됩니다.",
    "terms.section5.title": "5. 서비스 중단 및 변경",
    "terms.section5.content": "운영자는 서비스의 일부 또는 전부를 사전 통지 없이 변경하거나 종료할 수 있습니다.",
    "terms.effectiveDate": "본 약관은 2024년 6월 19일부터 적용됩니다.",
    
    // JPG Tool Introduction
    "intro.title": "JPG 변환 도구란?",
    "intro.description": "PNG, BMP, GIF, WEBP 등 다양한 이미지 포맷을 브라우저에서 바로 JPG로 변환할 수 있는 무료 온라인 도구입니다. 서버에 파일이 저장되지 않기 때문에 개인정보 걱정 없이 빠르고 안전하게 사용할 수 있습니다.",
    "intro.howToUse": "사용 방법",
    "intro.step1": "파일을 업로드하거나 드래그 & 드롭합니다.",
    "intro.step2": "미리보기를 확인한 후 '변환' 버튼을 클릭합니다.",
    "intro.step3": "변환된 JPG 파일이 자동 다운로드 됩니다.",
    
    // FAQ Section
    "faq.title": "자주 묻는 질문 (FAQ)",
    "faq.q1": "Q. 업로드된 파일은 어디에 저장되나요?",
    "faq.a1": "A. 모든 처리는 사용자 브라우저 내에서만 이루어지며, 서버에 파일이 전송되지 않습니다.",
    "faq.q2": "Q. 파일 용량 제한이 있나요?",
    "faq.a2": "A. 브라우저 성능에 따라 다르지만, 일반적으로 50MB 이하의 파일이 원활하게 처리됩니다.",
    "faq.q3": "Q. 여러 이미지를 한꺼번에 변환할 수 있나요?",
    "faq.a3": "A. 네, 다중 업로드 및 일괄 변환을 지원합니다.",
    
    // About Page
    "about.title": "소개",
    "about.mission.title": "우리의 미션",
    "about.mission.content": "ImageConverter는 사용자의 개인정보를 보호하면서도 강력한 이미지 처리 기능을 제공하는 것을 목표로 합니다. 모든 처리는 클라이언트 측에서 이루어져 완전히 안전하고 빠른 이미지 변환 경험을 제공합니다.",
    "about.features.title": "주요 기능",
    "about.features.item1": "다양한 이미지 형식을 JPG로 변환 (PNG, BMP, GIF, TIFF, WEBP, PDF)",
    "about.features.item2": "이미지 압축으로 파일 크기 최적화",
    "about.features.item3": "이미지 크기 조절 및 비율 맞춤",
    "about.features.item4": "다양한 비율로 이미지 자르기",
    "about.features.item5": "일괄 처리로 여러 파일 동시 변환",
    "about.technology.title": "기술적 특징",
    "about.technology.content": "최신 웹 기술을 활용하여 브라우저에서 직접 이미지 처리를 수행합니다. HTML5 Canvas API와 JavaScript를 사용하여 서버 없이도 고품질 이미지 변환이 가능하며, 사용자의 개인정보와 파일이 외부로 전송되지 않습니다.",
    "about.contact.title": "문의사항",
    "about.contact.content": "서비스 이용 중 문의사항이나 개선 제안이 있으시면 언제든지 연락해 주세요. 사용자 피드백을 통해 더 나은 서비스를 제공하겠습니다.",
    
    // About Additional Content
    "about.why.title": "왜 JPG로 변환해야 할까요?",
    "about.why.jpg": "JPG는 용량이 작고 웹에서 호환성이 높습니다.",
    "about.why.png": "PNG는 고화질과 투명도를 지원하지만 파일 크기가 큽니다.",
    "about.why.optimization": "필요에 따라 파일 포맷을 적절히 변환하면 웹페이지 최적화와 저장 공간 절약이 가능합니다.",
    "about.closing": "간단한 변환이 필요할 때, 이 사이트를 활용해보세요 😊",
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
    
    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.intro": "This site prioritizes user privacy protection above all else. This policy applies to the use of image conversion services.",
    "privacy.section1.title": "1. Personal Information Collection",
    "privacy.section1.content": "This site does not collect any personal information.",
    "privacy.section2.title": "2. Image Processing and Storage",
    "privacy.section2.content": "All images uploaded by users are processed only within the browser and are not stored on servers. Image files are immediately downloaded after conversion and no records are kept.",
    "privacy.section3.title": "3. Third Party Sharing",
    "privacy.section3.content": "This site does not collect personal information and therefore does not share it with third parties.",
    "privacy.section4.title": "4. Cookies and Tracking Technologies",
    "privacy.section4.content": "We do not use cookies, web beacons, or tracking technologies, nor do we use tools for advertising or user analytics purposes.",
    "privacy.effectiveDate": "This policy is effective from June 19, 2024.",
    
    // Terms of Service
    "terms.title": "Terms of Service",
    "terms.intro": "These terms stipulate the necessary conditions and responsibilities for using the image conversion website (hereinafter \"the site\").",
    "terms.section1.title": "1. Service Overview",
    "terms.section1.content": "This site provides services that help users perform functions such as converting image files like PNG, BMP, GIF, WEBP to JPG, compression, resizing, and cropping within the browser.",
    "terms.section2.title": "2. User Responsibilities",
    "terms.section2.item1": "Users must only upload images that do not infringe on others' copyrights, portrait rights, or personal information.",
    "terms.section2.item2": "All legal responsibility for uploaded images lies with the user.",
    "terms.section3.title": "3. Prohibited Activities",
    "terms.section3.item1": "Uploading images containing illegal content",
    "terms.section3.item2": "Sending excessive requests through automated means",
    "terms.section4.title": "4. Disclaimer",
    "terms.section4.content": "This site does not assume legal responsibility for user image damage, malfunctions, or data loss, and the service is provided \"as is\".",
    "terms.section5.title": "5. Service Interruption and Changes",
    "terms.section5.content": "The operator may change or terminate part or all of the service without prior notice.",
    "terms.effectiveDate": "These terms are effective from June 19, 2024.",
    
    // JPG Tool Introduction
    "intro.title": "What is JPG Conversion Tool?",
    "intro.description": "A free online tool that can convert various image formats like PNG, BMP, GIF, WEBP directly to JPG in your browser. Since files are not stored on servers, you can use it quickly and safely without privacy concerns.",
    "intro.howToUse": "How to Use",
    "intro.step1": "Upload files or drag & drop them.",
    "intro.step2": "Check the preview and click the 'Convert' button.",
    "intro.step3": "Converted JPG files will be automatically downloaded.",
    
    // FAQ Section
    "faq.title": "Frequently Asked Questions (FAQ)",
    "faq.q1": "Q. Where are uploaded files stored?",
    "faq.a1": "A. All processing is done within your browser only, and files are not transmitted to servers.",
    "faq.q2": "Q. Is there a file size limit?",
    "faq.a2": "A. It depends on browser performance, but generally files under 50MB are processed smoothly.",
    "faq.q3": "Q. Can I convert multiple images at once?",
    "faq.a3": "A. Yes, we support multiple uploads and batch conversion.",
    
    // About Page
    "about.title": "About",
    "about.mission.title": "Our Mission",
    "about.mission.content": "ImageConverter aims to provide powerful image processing capabilities while protecting user privacy. All processing is done client-side to provide a completely safe and fast image conversion experience.",
    "about.features.title": "Key Features",
    "about.features.item1": "Convert various image formats to JPG (PNG, BMP, GIF, TIFF, WEBP, PDF)",
    "about.features.item2": "Image compression for file size optimization",
    "about.features.item3": "Image resizing and aspect ratio adjustment",
    "about.features.item4": "Image cropping with various ratios",
    "about.features.item5": "Batch processing for multiple file conversion",
    "about.technology.title": "Technical Features",
    "about.technology.content": "Using cutting-edge web technologies to perform image processing directly in the browser. Using HTML5 Canvas API and JavaScript, high-quality image conversion is possible without servers, and user privacy and files are not transmitted externally.",
    "about.contact.title": "Contact",
    "about.contact.content": "If you have any questions or suggestions for improvement while using the service, please contact us anytime. We will provide better service through user feedback.",
    
    // About Additional Content
    "about.why.title": "Why should you convert to JPG?",
    "about.why.jpg": "JPG has a small file size and high compatibility on the web.",
    "about.why.png": "PNG supports high quality and transparency but has a larger file size.",
    "about.why.optimization": "Converting file formats appropriately as needed enables webpage optimization and storage space savings.",
    "about.closing": "Use this site when you need simple conversions 😊",
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