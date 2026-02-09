import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SurveyData {
  organizationType: string;
  researchField: string;
  teamSize: string;
  interestLevel: string;
  additionalInfo: string;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'emailSubmitted' | 'survey' | 'success'>('idle');
  const [surveyData, setSurveyData] = useState<SurveyData>({
    organizationType: '',
    researchField: '',
    teamSize: '',
    interestLevel: '',
    additionalInfo: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // ============================================
      // 방법 선택: 아래 두 방법 중 하나를 선택하세요
      // ============================================
      
      // Google Sheets 연동을 위해 Vercel 서버리스 함수 사용
      const useWeb3Forms = false; // Vercel 함수 사용
      
      if (useWeb3Forms) {
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
        
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: 'Core Barrier - 사전 도입 문의',
            email: email,
            from_name: 'Core Barrier 웹사이트',
            message: `이메일: ${email}\n신청일시: ${new Date().toLocaleString('ko-KR')}`,
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          setStatus('success');
          setEmail('');
        } else {
          throw new Error('제출 실패');
        }
      } else {
        // 방법 2: Vercel 서버리스 함수 사용 (더 많은 제어 가능)
        // api/submit-email.ts 파일을 사용합니다
        const visitorId = localStorage.getItem('visitor_id');
        const response = await fetch('/api/submit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email,
            visitorId: visitorId || '',
          }),
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
          setStatus('emailSubmitted');
          // 이메일은 유지 (설문 조사와 함께 제출)
        } else {
          throw new Error(result.error || '제출 실패');
        }
      }
    } catch (error) {
      console.error('이메일 제출 오류:', error);
      // 오류 발생 시에도 설문 조사로 진행
      setStatus('emailSubmitted');
    }
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Fake Door Test Metrics 수집
      const conversionData = {
        email,
        timestamp: new Date().toISOString(),
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        userAgent: navigator.userAgent
      };

      // 1. 상세 리스트 저장
      const existingEntries = JSON.parse(localStorage.getItem('waitlist_entries') || '[]');
      localStorage.setItem('waitlist_entries', JSON.stringify([...existingEntries, conversionData]));

      // 2. 전체 전환 수 카운트 (계산 용이성)
      const conversions = Number(localStorage.getItem('stats_conversions') || '0');
      localStorage.setItem('stats_conversions', (conversions + 1).toString());

      // 방문자 ID 가져오기
      const visitorId = localStorage.getItem('visitor_id');

      // 이메일과 설문 조사 데이터를 함께 제출
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          visitorId: visitorId || '',
          survey: surveyData,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setStatus('success');
        setEmail('');
        setSurveyData({
          organizationType: '',
          researchField: '',
          teamSize: '',
          interestLevel: '',
          additionalInfo: '',
        });
      } else {
        throw new Error(result.error || '제출 실패');
      }
    } catch (error) {
      console.error('설문 조사 제출 오류:', error);
      setStatus('success');
    }
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
                Core BArrier의 초기 출시에 대한 소식을<br/>가장 먼저 알려드리겠습니다.
              </p>
              <Button onClick={onClose} className="w-full">닫기</Button>
            </div>
          ) : status === 'emailSubmitted' || status === 'survey' ? (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">간단한 설문 조사</h3>
                <p className="text-slate-400 text-sm">
                  더 나은 서비스를 제공하기 위해 몇 가지 질문에 답변해주세요.
                </p>
              </div>

              <form onSubmit={handleSurveySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    소속 기관 유형 <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={surveyData.organizationType}
                    onChange={(e) => setSurveyData({ ...surveyData, organizationType: e.target.value })}
                    className="w-full h-10 px-3 bg-dark-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="대학">대학</option>
                    <option value="연구소">연구소</option>
                    <option value="기업">기업</option>
                    <option value="병원">병원</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    연구 분야 <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={surveyData.researchField}
                    onChange={(e) => setSurveyData({ ...surveyData, researchField: e.target.value })}
                    className="w-full h-10 px-3 bg-dark-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="의생명">의생명</option>
                    <option value="공학">공학</option>
                    <option value="자연과학">자연과학</option>
                    <option value="사회과학">사회과학</option>
                    <option value="인문학">인문학</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    연구팀 규모 <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={surveyData.teamSize}
                    onChange={(e) => setSurveyData({ ...surveyData, teamSize: e.target.value })}
                    className="w-full h-10 px-3 bg-dark-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="1-5명">1-5명</option>
                    <option value="6-10명">6-10명</option>
                    <option value="11-20명">11-20명</option>
                    <option value="21-50명">21-50명</option>
                    <option value="50명 이상">50명 이상</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    관심도 <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={surveyData.interestLevel}
                    onChange={(e) => setSurveyData({ ...surveyData, interestLevel: e.target.value })}
                    className="w-full h-10 px-3 bg-dark-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="매우 높음">매우 높음</option>
                    <option value="높음">높음</option>
                    <option value="보통">보통</option>
                    <option value="낮음">낮음</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    추가 의견 (선택사항)
                  </label>
                  <textarea
                    value={surveyData.additionalInfo}
                    onChange={(e) => setSurveyData({ ...surveyData, additionalInfo: e.target.value })}
                    placeholder="원하시는 기능이나 궁금한 점을 알려주세요..."
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-600 resize-none"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button"
                    onClick={async () => {
                      // 설문 조사 없이 이메일만 저장
                      setStatus('loading');
                      try {
                        // Fake Door Test Metrics 수집
                        const conversionData = {
                          email,
                          timestamp: new Date().toISOString(),
                          device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                          userAgent: navigator.userAgent
                        };

                        // 1. 상세 리스트 저장
                        const existingEntries = JSON.parse(localStorage.getItem('waitlist_entries') || '[]');
                        localStorage.setItem('waitlist_entries', JSON.stringify([...existingEntries, conversionData]));

                        // 2. 전체 전환 수 카운트 (계산 용이성)
                        const conversions = Number(localStorage.getItem('stats_conversions') || '0');
                        localStorage.setItem('stats_conversions', (conversions + 1).toString());

                        // 방문자 ID 가져오기
                        const visitorId = localStorage.getItem('visitor_id');

                        const response = await fetch('/api/submit-email', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ 
                            email,
                            visitorId: visitorId || '',
                            survey: null, // 설문 조사 없이 저장
                          }),
                        });

                        const result = await response.json();
                        
                        if (response.ok && result.success) {
                          setStatus('success');
                          setEmail('');
                        } else {
                          throw new Error(result.error || '제출 실패');
                        }
                      } catch (error) {
                        console.error('이메일 제출 오류:', error);
                        setStatus('success');
                      }
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600"
                    disabled={status === 'loading'}
                  >
                    건너뛰기
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        제출 중...
                      </>
                    ) : (
                      '설문 조사 제출하기'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">사전 도입 문의</h3>
                <p className="text-slate-400 text-sm">
                  현재 Core BArrier는 주요 연구기관과 베타 테스트 중입니다. 
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
