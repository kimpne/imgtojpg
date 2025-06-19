import { useLanguage } from "@/contexts/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 transition-colors">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-300 dark:border-gray-600 pb-4">
            {t('about.title')}
          </h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('about.mission.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.mission.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('about.features.title')}
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>{t('about.features.item1')}</li>
                <li>{t('about.features.item2')}</li>
                <li>{t('about.features.item3')}</li>
                <li>{t('about.features.item4')}</li>
                <li>{t('about.features.item5')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('about.technology.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.technology.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('about.contact.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.contact.content')}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}