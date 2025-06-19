import { useLanguage } from "@/contexts/language-context";
import { Link } from "wouter";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-custom rounded-lg flex items-center justify-center">
                <i className="fas fa-image text-white"></i>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">ImageConverter</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.conversionTools')}</h5>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-primary-custom transition-colors">{t('footer.jpgConvert')}</Link></li>
              <li><Link href="/" className="hover:text-primary-custom transition-colors">{t('footer.pngConvert')}</Link></li>
              <li><Link href="/" className="hover:text-primary-custom transition-colors">{t('footer.webpConvert')}</Link></li>
              <li><Link href="/" className="hover:text-primary-custom transition-colors">{t('footer.pdfConvert')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.editTools')}</h5>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/compress" className="hover:text-primary-custom transition-colors">{t('footer.imageCompress')}</Link></li>
              <li><Link href="/resize" className="hover:text-primary-custom transition-colors">{t('footer.resize')}</Link></li>
              <li><Link href="/crop" className="hover:text-primary-custom transition-colors">{t('footer.crop')}</Link></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">{t('footer.rotate')}</a></li>
              div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.guide')}</h5>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/compression-guide" className="hover:text-primary-custom transition-colors">{t('footer.imageCompression')}</Link></li>
                  <li><Link href="/web-optimization" className="hover:text-primary-custom transition-colors">{t('footer.webOptimization')}</Link></li>
                  <li><Link href="/png-vs-jpg" className="hover:text-primary-custom transition-colors">{t('footer.pngVsJpg')}</Link></li>
                  <li><Link href="/why-convert-to-jpg" className="hover:text-primary-custom transition-colors">{t('footer.whyJpg')}</Link></li>
                </ul>
              </div>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{t('footer.support')}</h5>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-primary-custom transition-colors">{t('about.title')}</Link></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">{t('footer.contact')}</a></li>
              <li><Link href="/privacy" className="hover:text-primary-custom transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-primary-custom transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
