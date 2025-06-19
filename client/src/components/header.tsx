import { Link } from "wouter";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary-custom rounded-lg flex items-center justify-center">
              <i className="fas fa-image text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{t('header.title')}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('header.subtitle')}</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('header.convert')}
            </Link>
            <Link href="/compress" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('header.compress')}
            </Link>
            <Link href="/resize" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('header.resize')}
            </Link>
            <Link href="/crop" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('header.crop')}
            </Link>
            <a href="/why-convert-to-jpg.html" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('nav.whyConvert')}
            </a>
            <a href="/png-vs-jpg.html" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('nav.pngVsJpg')}
            </a>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-custom transition-colors text-sm">
              {t('about.title')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                  <i className="fas fa-globe mr-1"></i>
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('ko')}>
                  한국어
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-custom"
            >
              {theme === 'light' ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun"></i>
              )}
            </Button>

            {/* Mobile Menu */}
            <button className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-custom">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
