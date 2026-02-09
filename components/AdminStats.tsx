import React from 'react';
import { X, Users, MousePointerClick, TrendingUp, Mail } from 'lucide-react';

interface AdminStatsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminStats: React.FC<AdminStatsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const impressions = Number(localStorage.getItem('stats_impressions') || '0');
  const conversions = Number(localStorage.getItem('stats_conversions') || '0');
  const entries = JSON.parse(localStorage.getItem('waitlist_entries') || '[]');
  
  const conversionRate = impressions > 0 ? ((conversions / impressions) * 100).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-brand-500" />
              Fake Door Test 실시간 지표
            </h2>
            <p className="text-xs text-slate-400 mt-1">이 페이지는 관리자 전용 확인 페이지입니다.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                <Users size={14} /> 총 방문자 (PV)
              </div>
              <div className="text-2xl font-bold text-white">{impressions}</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                <MousePointerClick size={14} /> 총 신청자 (CV)
              </div>
              <div className="text-2xl font-bold text-brand-500">{conversions}</div>
            </div>
            <div className="bg-brand-500/10 p-4 rounded-xl border border-brand-500/30">
              <div className="flex items-center gap-2 text-brand-400 text-xs mb-2">
                <TrendingUp size={14} /> 전환율
              </div>
              <div className="text-2xl font-bold text-brand-400">{conversionRate}%</div>
            </div>
          </div>

          {/* Email List */}
          <div>
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Mail size={16} /> 수집된 데이터 리스트 ({entries.length})
            </h3>
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="max-h-[300px] overflow-y-auto">
                {entries.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">아직 수집된 데이터가 없습니다.</div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 sticky top-0">
                      <tr>
                        <th className="p-3 text-slate-400 border-b border-slate-700">날짜/시간</th>
                        <th className="p-3 text-slate-400 border-b border-slate-700">이메일</th>
                        <th className="p-3 text-slate-400 border-b border-slate-700">기기</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {entries.slice().reverse().map((entry: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-700/50">
                          <td className="p-3 text-slate-300 font-mono">{new Date(entry.timestamp).toLocaleString()}</td>
                          <td className="p-3 text-white font-medium">{entry.email}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded ${entry.device === 'Mobile' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                              {entry.device}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
            <p className="text-[10px] text-blue-400 leading-relaxed">
              * 데이터는 브라우저 로컬 저장소(LocalStorage)에만 기록됩니다. 
              시크릿 모드 사용 시 데이터가 보존되지 않을 수 있으며, 브라우저를 초기화하면 삭제됩니다.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-800/80 border-t border-slate-700 flex justify-end">
           <button 
             onClick={() => {
               if(confirm('모든 통계 데이터를 초기화하시겠습니까?')) {
                 localStorage.removeItem('stats_impressions');
                 localStorage.removeItem('stats_conversions');
                 localStorage.removeItem('waitlist_entries');
                 window.location.reload();
               }
             }}
             className="text-xs text-red-400 hover:text-red-300 px-4 py-2"
           >
             데이터 초기화
           </button>
        </div>
      </div>
    </div>
  );
};