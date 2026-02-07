import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-24 bg-dark-800 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">왜 Core BArrier인가요?</h2>
          <p className="text-slate-400">기존 솔루션들이 해결하지 못한 연구실만의 문제를 해결합니다.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-6 px-4 text-slate-400 font-medium">기능 / 서비스</th>
                <th className="py-6 px-4 text-white text-xl font-bold bg-brand-900/20 border-t-4 border-brand-500 w-1/3 text-center">Core BArrier</th>
                <th className="py-6 px-4 text-slate-400 font-medium text-center">DRM (파수, 마크애니)</th>
                <th className="py-6 px-4 text-slate-400 font-medium text-center">협업 툴 (Notion, Slack)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="py-6 px-4 text-slate-300 font-medium">지식 계승 (SLLM)</td>
                <td className="py-6 px-4 text-center bg-brand-900/10">
                  <div className="flex justify-center text-brand-400"><Check size={24} strokeWidth={3} /></div>
                  <span className="text-xs text-brand-300 block mt-1">자동 자산화</span>
                </td>
                <td className="py-6 px-4 text-center">
                   <div className="flex justify-center text-slate-600"><X size={24} /></div>
                </td>
                <td className="py-6 px-4 text-center">
                    <div className="flex justify-center text-yellow-500"><Minus size={24} /></div>
                    <span className="text-xs text-slate-500 block mt-1">수동 정리 필요</span>
                </td>
              </tr>
              <tr>
                <td className="py-6 px-4 text-slate-300 font-medium">보안 관리</td>
                <td className="py-6 px-4 text-center bg-brand-900/10">
                  <div className="flex justify-center text-brand-400"><Check size={24} strokeWidth={3} /></div>
                  <span className="text-xs text-brand-300 block mt-1">AI 자동 분류</span>
                </td>
                <td className="py-6 px-4 text-center">
                   <div className="flex justify-center text-brand-400"><Check size={24} strokeWidth={3} /></div>
                   <span className="text-xs text-slate-500 block mt-1">강력 (하지만 불편함)</span>
                </td>
                <td className="py-6 px-4 text-center">
                    <div className="flex justify-center text-slate-600"><X size={24} /></div>
                    <span className="text-xs text-slate-500 block mt-1">외부 클라우드 의존</span>
                </td>
              </tr>
              <tr>
                <td className="py-6 px-4 text-slate-300 font-medium">도입 비용 (10인 기준)</td>
                <td className="py-6 px-4 text-center bg-brand-900/10">
                  <span className="text-lg font-bold text-white">연 60만원</span>
                </td>
                <td className="py-6 px-4 text-center text-slate-400">
                  수천만원 이상
                </td>
                <td className="py-6 px-4 text-center text-slate-400">
                  약 360만원
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};