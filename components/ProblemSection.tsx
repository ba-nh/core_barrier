import React from 'react';
import { AlertTriangle, Search, Lock, HardDrive, FileQuestion, XCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-dark-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            "선배가 떠난 자리, <span className="text-brand-500">텅 빈 폴더</span>만 남았습니다."
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
             졸업과 함께 포맷되는 연구실의 노하우, USB에 담겨 사라지는 기밀 데이터.<br/>
             연구 자산, 언제까지 개인의 기억과 양심에만 맡기시겠습니까?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Card 1: Searching for files (Knowledge Loss) */}
          <div className="group relative rounded-2xl overflow-hidden bg-dark-800 border border-slate-700 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 z-20"></div>
            
            {/* Image Area: Person actively searching/stressed looking at screen/files */}
            <div className="relative h-80 overflow-hidden bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80" 
                alt="Researcher frantically searching through digital files" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Minimal gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90"></div>
              
              {/* Floating UI: File Not Found Error */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-slate-900/95 backdrop-blur-md rounded-lg border border-slate-600 shadow-xl overflow-hidden">
                      <div className="bg-slate-800 px-3 py-2 flex items-center justify-between border-b border-slate-700">
                          <span className="text-xs text-slate-300 flex items-center gap-2 font-mono">
                              <Search size={12} /> System Search
                          </span>
                          <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          </div>
                      </div>
                      <div className="p-4 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                              <FileQuestion className="text-red-400" size={16} />
                          </div>
                          <div>
                              <p className="text-sm font-bold text-white mb-1">데이터를 찾을 수 없습니다</p>
                              <p className="text-xs text-slate-400 font-mono mb-2">
                                Last modified: 2 years ago by Dr.Kim
                              </p>
                              <div className="inline-flex items-center gap-1 text-[10px] text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                  <XCircle size={10} /> 담당자 연락처 없음
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            <div className="p-8 relative z-10 bg-dark-800 border-t border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">연구 지식의 블랙홀</h3>
              </div>
              <p className="text-slate-300 font-medium mb-2">
                "김박사가 졸업하고 나니 그 실험 데이터가 어디 있는지 아무도 모릅니다."
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                졸업한 선배의 컴퓨터를 뒤지며 사라진 데이터를 찾는 낭비, 이제 멈춰야 합니다.
              </p>
            </div>
          </div>

          {/* Problem Card 2: USB Leak (Security) */}
          <div className="group relative rounded-2xl overflow-hidden bg-dark-800 border border-slate-700 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/30">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500 z-20"></div>
            
             {/* Image Area: Clear Close up of USB insertion */}
             <div className="relative h-80 overflow-hidden bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&q=80" 
                alt="Hand inserting USB drive into laptop port" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Minimal gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90"></div>
              
              {/* Floating UI: Data Transfer Alert */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                 <div className="bg-slate-900/95 backdrop-blur-md rounded-lg border border-slate-600 shadow-xl overflow-hidden">
                    <div className="bg-slate-800 px-3 py-2 flex items-center justify-between border-b border-slate-700">
                          <span className="text-xs text-slate-300 flex items-center gap-2 font-mono">
                              <HardDrive size={12} /> Data Transfer
                          </span>
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-white font-medium">Project_Falcon_Design.cad</span>
                            <span className="text-xs text-brand-400 font-bold">Copying...</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-red-500 w-[75%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        </div>

                        <div className="flex items-center gap-2">
                             <AlertTriangle size={14} className="text-red-500" />
                             <span className="text-xs text-red-400 font-bold animate-pulse">외부 반출 승인되지 않음</span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="p-8 relative z-10 bg-dark-800 border-t border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">보안 수동 관리의 한계</h3>
              </div>
              <p className="text-slate-300 font-medium mb-2">
                "중요한 산학 과제 데이터, USB 하나로 너무 쉽게 빠져나갑니다."
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                물리적 매체를 통한 고의적/우발적 기술 유출, 개인의 양심에만 맡기기엔 리스크가 너무 큽니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};