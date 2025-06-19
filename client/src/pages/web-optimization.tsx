import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function WebOptimization() {
  const { language } = useLanguage();

  const content = {
    ko: {
      title: "웹사이트용 이미지 최적화 방법",
      intro: "이미지가 많은 웹사이트는 로딩 속도와 사용자 경험을 위해 최적화가 필수입니다. 특히 SEO 측면에서도 이미지 최적화는 중요한 요소로 평가됩니다.",
      whyOptimize: {
        title: "왜 최적화가 필요할까?",
        reasons: [
          "웹페이지 로딩 속도 개선 → 이탈률 감소",
          "모바일 환경에서 데이터 절약",
          "검색엔진에서 긍정적인 평가 유도"
        ]
      },
      strategies: {
        title: "최적화 전략",
        items: [
          "파일 포맷: 사진은 JPG, 투명도 필요한 요소는 PNG, 최신 웹은 WebP 활용",
          "적절한 해상도: 너무 큰 이미지 지양, 페이지 영역에 맞게 리사이징",
          "압축 수준: 자동 도구를 통해 품질 손상 최소화하며 용량 절감"
        ]
      },
      webp: {
        title: "WebP 포맷이란?",
        content: "구글이 만든 최신 이미지 포맷으로, JPG보다 25~35% 더 작은 용량을 자랑하면서도 화질 유지가 뛰어납니다. 브라우저 호환성도 넓어지고 있어 웹 최적화에 적합합니다."
      },
      conclusion: {
        title: "결론",
        content: "이미지 최적화는 단순히 '작게 만드는 것'이 아닌, 목적에 맞는 포맷·크기·압축을 균형 있게 조절하는 전략입니다."
      }
    },
    en: {
      title: "Web Image Optimization Methods",
      intro: "Image-heavy websites require optimization for loading speed and user experience. Image optimization is also evaluated as an important factor in SEO.",
      whyOptimize: {
        title: "Why is Optimization Necessary?",
        reasons: [
          "Improve webpage loading speed → Reduce bounce rate",
          "Save data in mobile environments",
          "Induce positive evaluation from search engines"
        ]
      },
      strategies: {
        title: "Optimization Strategies",
        items: [
          "File format: JPG for photos, PNG for elements requiring transparency, WebP for modern web",
          "Appropriate resolution: Avoid oversized images, resize to match page area",
          "Compression level: Minimize quality damage while reducing size through automated tools"
        ]
      },
      webp: {
        title: "What is WebP Format?",
        content: "A modern image format created by Google that boasts 25-35% smaller file sizes than JPG while maintaining excellent image quality. Browser compatibility is also expanding, making it suitable for web optimization."
      },
      conclusion: {
        title: "Conclusion",
        content: "Image optimization is not simply about 'making it smaller', but a strategy of balancing format, size, and compression according to purpose."
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
              {currentContent.whyOptimize.title}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              {currentContent.whyOptimize.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🔧</span>
              {currentContent.strategies.title}
            </h2>
            <ul className="space-y-3">
              {currentContent.strategies.items.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🧩</span>
              {currentContent.webp.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentContent.webp.content}
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