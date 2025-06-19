import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 transition-colors">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-300 dark:border-gray-600 pb-4">
            {t('terms.title')}
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {t('terms.intro')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('terms.section1.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section1.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('terms.section2.title')}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t('terms.section2.item1')}</li>
              <li>{t('terms.section2.item2')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('terms.section3.title')}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t('terms.section3.item1')}</li>
              <li>{t('terms.section3.item2')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('terms.section4.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section4.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('terms.section5.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.section5.content')}
            </p>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8 italic">
            {t('terms.effectiveDate')}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}