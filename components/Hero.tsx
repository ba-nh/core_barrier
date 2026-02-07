import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients - Reduced opacity for better text contrast */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-sm mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">
            연구실 전용 보안 & 자산 관리 OS
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100 drop-shadow-lg">
          연구 데이터 관리,<br />
          이제 더 <span className="text-brand-500 underline decoration-brand-500/30 decoration-4 underline-offset-8">안전하고 편리하게</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 drop-shadow-md">
          Core BArrier는 복잡한 보안 규정과 방대한 연구 데이터를 AI로 자동화합니다.<br className="hidden sm:block"/>
          불필요한 관리 소요를 줄이고, 연구 본연의 가치에 집중하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
          <Button size="lg" onClick={onCtaClick} className="w-full sm:w-auto group">
            무료 데모 신청하기
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}>
            문제 상황 보기
          </Button>
        </div>
      </div>
    </section>
  );
};