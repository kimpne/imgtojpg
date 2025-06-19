import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function WhyConvert() {
  const { language } = useLanguage();

  const content = {
    ko: {
      title: "JPG로 이미지 변환이 필요한 이유",
      intro: "JPG(JPEG)는 이미지 압축 포맷 중 가장 널리 사용되는 형식입니다. 다양한 이미지 포맷 중에서도 JPG는 웹사이트, 블로그, SNS, 쇼핑몰 등 대부분의 온라인 플랫폼에서 표준처럼 사용됩니다.",
      reasonsTitle: "JPG 변환이 필요한 대표적인 이유",
      reasons: [
        { title: "파일 용량 절감", desc: "PNG나 BMP에 비해 파일 크기가 작습니다." },
        { title: "호환성 우수", desc: "거의 모든 브라우저, 앱, 디바이스에서 지원됩니다." },
        { title: "업로드 제한 해소", desc: "이메일, 카카오톡, 쇼핑몰 등은 JPG만 지원하는 경우가 많습니다." },
        { title: "빠른 웹 페이지 로딩", desc: "이미지 로딩 속도가 빨라 SEO에도 유리합니다." }
      ],
      whenTitle: "어떤 이미지를 JPG로 변환하면 좋을까?",
      whenContent: "투명 배경이 필요하지 않은 사진, 블로그용 썸네일, 쇼핑몰 제품 이미지 등은 JPG로 변환하면 더 효율적으로 활용할 수 있습니다.",
      conclusionTitle: "결론",
      conclusionContent: "이미지의 목적과 용도를 고려해 JPG로 변환하면 저장 공간을 절약하고, 전송 속도와 사용 편의성을 모두 높일 수 있습니다."
    },
    en: {
      title: "Why You Need to Convert Images to JPG",
      intro: "JPG (JPEG) is the most widely used image compression format. Among various image formats, JPG is used as a standard on most online platforms such as websites, blogs, SNS, and shopping malls.",
      reasonsTitle: "Main Reasons for JPG Conversion",
      reasons: [
        { title: "File Size Reduction", desc: "Smaller file size compared to PNG or BMP." },
        { title: "Excellent Compatibility", desc: "Supported by almost all browsers, apps, and devices." },
        { title: "Upload Limit Resolution", desc: "Many platforms like email, messaging apps, and shopping sites only support JPG." },
        { title: "Fast Web Page Loading", desc: "Faster image loading speed, which is also beneficial for SEO." }
      ],
      whenTitle: "Which Images Should Be Converted to JPG?",
      whenContent: "Photos that don't need transparent backgrounds, blog thumbnails, and product images for shopping sites can be used more efficiently when converted to JPG.",
      conclusionTitle: "Conclusion",
      conclusionContent: "By considering the purpose and use of images and converting them to JPG, you can save storage space and improve both transmission speed and usability."
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 transition-colors">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {currentContent.title}
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {currentContent.intro}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">✅</span>
              {currentContent.reasonsTitle}
            </h2>
            <ul className="space-y-4">
              {currentContent.reasons.map((reason, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <strong>{reason.title}:</strong> {reason.desc}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🧩</span>
              {currentContent.whenTitle}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentContent.whenContent}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📌</span>
              {currentContent.conclusionTitle}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentContent.conclusionContent}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}