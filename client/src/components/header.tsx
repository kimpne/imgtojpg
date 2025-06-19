import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary-custom rounded-lg flex items-center justify-center">
              <i className="fas fa-image text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">ImageConverter</h1>
              <p className="text-sm text-gray-500">무료 이미지 변환 도구</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary-custom transition-colors">
              변환 도구
            </Link>
            <a href="#" className="text-gray-600 hover:text-primary-custom transition-colors">
              압축
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-custom transition-colors">
              편집
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-custom transition-colors">
              도움말
            </a>
          </nav>
          
          <button className="md:hidden p-2 text-gray-600 hover:text-primary-custom">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
