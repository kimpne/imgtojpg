import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CompressionGuide() {
  const { language } = useLanguage();

  const content = {
    ko: {
      title: "이미지 압축 시 화질 유지하는 팁",
      intro: "이미지 압축은 웹사이트 속도를 빠르게 하고 저장 공간을 절약하는 데 매우 중요합니다. 하지만 압축을 잘못하면 화질이 손상될 수 있습니다. 아래의 팁을 활용해 화질을 최대한 유지하면서도 효율적인 압축을 시도해보세요.",
      compressionTypes: {
        title: "손실 압축 vs 비손실 압축",
        lossy: "손실 압축: 일부 품질 손실이 있지만 용량 절감에 유리 (예: JPG)",
        lossless: "비손실 압축: 원본 유지, 대신 용량 절감 폭이 작음 (예: PNG)"
      },
      considerations: {
        title: "압축 시 고려할 요소",
        items: [
          "용도에 따라 포맷 선택 (웹: JPG / 로고: PNG)",
          "90~80% 사이 품질로 저장하면 눈에 띄는 손상 없이 용량 감소 가능",
          "해상도가 너무 높은 이미지는 크기부터 조절 후 압축"
        ]
      },
      comparison: {
        title: "압축 전후 비교",
        content: "이미지 압축 도구를 사용할 때는 미리보기 기능을 활용하여 품질 차이를 눈으로 비교하는 것이 중요합니다."
      },
      conclusion: {
        title: "결론",
        content: "무조건 압축률만 높이기보다는, 사용 목적에 맞게 균형 있게 설정하는 것이 핵심입니다."
      }
    },
    en: {
      title: "Tips for Maintaining Image Quality During Compression",
      intro: "Image compression is crucial for speeding up websites and saving storage space. However, improper compression can damage image quality. Use the following tips to achieve efficient compression while maintaining maximum quality.",
      compressionTypes: {
        title: "Lossy vs Lossless Compression",
        lossy: "Lossy compression: Some quality loss but advantageous for size reduction (e.g., JPG)",
        lossless: "Lossless compression: Maintains original quality, but smaller reduction in file size (e.g., PNG)"
      },
      considerations: {
        title: "Factors to Consider When Compressing",
        items: [
          "Choose format based on purpose (Web: JPG / Logo: PNG)",
          "Saving at 90-80% quality can reduce size without noticeable damage",
          "For images with too high resolution, adjust size first then compress"
        ]
      },
      comparison: {
        title: "Before and After Compression Comparison",
        content: "When using image compression tools, it's important to use preview features to visually compare quality differences."
      },
      conclusion: {
        title: "Conclusion",
        content: "Rather than just maximizing compression ratio, the key is to set it in a balanced way according to the intended use."
      }
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
              {currentContent.compressionTypes.title}
            </h2>
            <ul className="space-y-3">
              <li className="text-gray-700 dark:text-gray-300">
                <strong>{currentContent.compressionTypes.lossy.split(':')[0]}:</strong> {currentContent.compressionTypes.lossy.split(':')[1]}
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong>{currentContent.compressionTypes.lossless.split(':')[0]}:</strong> {currentContent.compressionTypes.lossless.split(':')[1]}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🛠️</span>
              {currentContent.considerations.title}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              {currentContent.considerations.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🔍</span>
              {currentContent.comparison.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentContent.comparison.content}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">📌</span>
              {currentContent.conclusion.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentContent.conclusion.content}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}