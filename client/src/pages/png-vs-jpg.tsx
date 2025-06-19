import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PngVsJpg() {
  const { language } = useLanguage();

  const content = {
    ko: {
      title: "PNG vs JPG, 어떤 포맷이 더 좋을까?",
      intro: "PNG와 JPG는 가장 널리 사용되는 이미지 포맷입니다. 두 포맷은 각각의 장단점이 뚜렷하므로, 상황에 따라 적절하게 선택해야 합니다.",
      jpgTitle: "JPG의 특징",
      jpgFeatures: [
        "손실 압축 (이미지 품질이 약간 손상될 수 있음)",
        "용량이 작아 웹용으로 적합",
        "사진, 제품 이미지, 배경 없는 일반 콘텐츠에 적합"
      ],
      pngTitle: "PNG의 특징",
      pngFeatures: [
        "비손실 압축 (원본 품질 그대로 유지)",
        "투명 배경 지원 (로고, 아이콘 등에 유리)",
        "파일 크기가 크고, 웹에서는 로딩 시간이 다소 길 수 있음"
      ],
      usageTitle: "어떤 상황에 어떤 포맷을 써야 할까?",
      usageTable: [
        { use: "사진, 여행 이미지", format: "JPG" },
        { use: "로고, 아이콘", format: "PNG" },
        { use: "웹용 배너, 블로그 이미지", format: "JPG" },
        { use: "디자인 시안, 투명 배경 필요", format: "PNG" }
      ],
      conclusionTitle: "결론",
      conclusionContent: "투명도가 필요하거나 정교한 그래픽은 PNG, 웹 속도와 효율이 중요한 경우는 JPG를 사용하는 것이 적절합니다."
    },
    en: {
      title: "PNG vs JPG, Which Format is Better?",
      intro: "PNG and JPG are the most widely used image formats. Since each format has distinct advantages and disadvantages, you should choose appropriately depending on the situation.",
      jpgTitle: "JPG Features",
      jpgFeatures: [
        "Lossy compression (image quality may be slightly damaged)",
        "Small file size, suitable for web use",
        "Suitable for photos, product images, and general content without backgrounds"
      ],
      pngTitle: "PNG Features",
      pngFeatures: [
        "Lossless compression (maintains original quality)",
        "Transparent background support (advantageous for logos and icons)",
        "Large file size, may have longer loading times on the web"
      ],
      usageTitle: "Which Format Should You Use in Which Situation?",
      usageTable: [
        { use: "Photos, travel images", format: "JPG" },
        { use: "Logos, icons", format: "PNG" },
        { use: "Web banners, blog images", format: "JPG" },
        { use: "Design mockups, transparent background needed", format: "PNG" }
      ],
      conclusionTitle: "Conclusion",
      conclusionContent: "PNG is appropriate for graphics that need transparency or precision, while JPG should be used when web speed and efficiency are important."
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
              <span className="mr-2">📷</span>
              {currentContent.jpgTitle}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              {currentContent.jpgFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🖼️</span>
              {currentContent.pngTitle}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              {currentContent.pngFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🧭</span>
              {currentContent.usageTitle}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                      {language === 'ko' ? '용도' : 'Use Case'}
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">
                      {language === 'ko' ? '추천 포맷' : 'Recommended Format'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentContent.usageTable.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                        {row.use}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                        {row.format}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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