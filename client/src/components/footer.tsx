export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-custom rounded-lg flex items-center justify-center">
                <i className="fas fa-image text-white"></i>
              </div>
              <span className="font-semibold text-gray-900">ImageConverter</span>
            </div>
            <p className="text-gray-600 text-sm">
              무료 이미지 변환 및 편집 도구로 모든 이미지 작업을 간편하게 처리하세요.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">변환 도구</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-custom transition-colors">JPG 변환</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">PNG 변환</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">WEBP 변환</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">PDF 변환</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">편집 도구</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-custom transition-colors">이미지 압축</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">크기 조정</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">자르기</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">회전</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">지원</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-custom transition-colors">도움말</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">문의하기</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-primary-custom transition-colors">이용약관</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 ImageConverter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
