import React, { useState } from 'react';
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
             <button onClick={openModal} className="hidden md:block text-sm font-medium text-slate-300 hover:text-white px-3 py-2">
                로그인
             </button>
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