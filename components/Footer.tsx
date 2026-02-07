import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-slate-800 py-12 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-slate-500 max-w-xs">
              연구실의 지식 자산을 보호하고<br/>
              안전한 연구 환경을 만듭니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-500">
                <li>기능 소개</li>
                <li>도입 사례</li>
                <li>요금 안내</li>
                <li>API 문서</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-500">
                <li>회사 소개</li>
                <li>채용</li>
                <li>문의하기</li>
                <li>개인정보처리방침</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-600">
          © 2024 Core BArrier. All rights reserved.
        </div>
      </div>
    </footer>
  );
};