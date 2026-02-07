import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-dark-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">등록되었습니다!</h3>
              <p className="text-slate-400 mb-6">
                Core Barrier의 초기 출시에 대한 소식을<br/>가장 먼저 알려드리겠습니다.
              </p>
              <Button onClick={onClose} className="w-full">닫기</Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">사전 도입 문의</h3>
                <p className="text-slate-400 text-sm">
                  현재 Core Barrier는 주요 연구기관과 베타 테스트 중입니다. 
                  연락처를 남겨주시면 도입 가이드와 데모 영상을 보내드립니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                    이메일 주소 (학교/회사)
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@lab.ac.kr"
                    className="w-full h-10 px-3 bg-dark-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-600 transition-all"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      처리중...
                    </>
                  ) : (
                    '도입 가이드 신청하기'
                  )}
                </Button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  * 스팸 메일은 절대 발송하지 않습니다.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};