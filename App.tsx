import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionDashboard } from './components/SolutionDashboard';
import { ComparisonTable } from './components/ComparisonTable';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 방문자 ID 생성 또는 가져오기
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      // 고유 방문자 ID 생성 (타임스탬프 + 랜덤 문자열)
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('visitor_id', visitorId);
    }

    // Google Sheets에 방문자 카운트
    const trackVisit = async () => {
      try {
        await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visitorId }),
        });
      } catch (error) {
        console.error('방문 추적 오류:', error);
        // 오류가 발생해도 앱은 정상 작동하도록 함
      }
    };

    trackVisit();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 font-sans selection:bg-brand-500/30">
      
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-dark-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <a href="#solution" className="text-sm text-slate-400 hover:text-white transition-colors">솔루션</a>
            <a href="#comparison" className="text-sm text-slate-400 hover:text-white transition-colors">비교 분석</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">요금제</a>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={openModal}>무료 데모</Button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onCtaClick={openModal} />
        <ProblemSection />
        <SolutionDashboard />
        <div id="comparison">
          <ComparisonTable />
        </div>
        <div id="pricing">
          <Pricing onCtaClick={openModal} />
        </div>
      </main>

      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
