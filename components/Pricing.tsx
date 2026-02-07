import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';

interface PricingProps {
  onCtaClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onCtaClick }) => {
  return (
    <section className="py-24 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">합리적인 가격으로 시작하세요</h2>
          <p className="text-slate-400">연구실 서버 환경에 맞는 최적의 플랜을 선택하세요.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="bg-dark-800 rounded-2xl p-8 border border-slate-700 flex flex-col hover:border-slate-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Standard</h3>
            <p className="text-slate-400 text-sm mb-6">이미 자체 서버(GPU)를 보유한 연구실</p>
            <div className="text-4xl font-bold text-white mb-6">
              60만원 <span className="text-lg text-slate-500 font-normal">/ 년</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "보유 서버에 솔루션 설치",
                "기본 지식 아카이빙 및 자산화",
                "기본 보안 정책 모니터링",
                "지속적인 기능 업데이트 (보고서 생성 등)"
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <Check size={18} className="text-brand-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full" onClick={onCtaClick}>시작하기</Button>
          </div>

          {/* Professional Plan */}
          <div className="bg-gradient-to-b from-brand-900/20 to-dark-800 rounded-2xl p-8 border border-brand-500/50 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
               RECOMMENDED
             </div>
            <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
            <p className="text-slate-400 text-sm mb-6">서버 구축 및 초기 셋업이 필요한 연구실</p>
            <div className="mb-6">
                <div className="text-lg text-brand-400 font-bold mb-1">초기 구축비 200만원</div>
                <div className="text-4xl font-bold text-white">
                + 60만원 <span className="text-lg text-slate-500 font-normal">/ 년</span>
                </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "전용 서버 구축 및 하드웨어 세팅",
                "대용량 SLLM 전용 환경 최적화",
                "고급 보안 정책 커스터마이징",
                "전담 엔지니어 온보딩 지원"
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-white">
                  <div className="bg-brand-500 rounded-full p-0.5 mr-3">
                    <Check size={14} className="text-white" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full" onClick={onCtaClick}>도입 상담 신청</Button>
          </div>
        </div>
      </div>
    </section>
  );
};