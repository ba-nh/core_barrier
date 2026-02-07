import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  ShieldCheck, 
  Send, 
  FileText, 
  Check, 
  AlertCircle, 
  Activity,
  HardDrive,
  AlertOctagon,
  AlertTriangle,
  Sparkles,
  PieChart,
  Clock
} from 'lucide-react';

type Tab = 'assistant' | 'security' | 'monitoring' | 'report';

export const SolutionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('assistant');

  return (
    <section id="solution" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            우리는 연구실의 <span className="text-brand-500">휘발성을 제거</span>합니다
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto px-2 text-sm md:text-base leading-relaxed">
            인력이 바뀌어도 연구의 맥락과 책임이 끊기지 않도록.
            <span className="block mt-1 sm:inline sm:mt-0"> Core Barrier는 당신의 연구실을 <strong>기억하고 설명 가능한 조직</strong>으로 만듭니다.</span>
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="max-w-5xl mx-auto bg-dark-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden ring-1 ring-white/10">
          
          {/* Dashboard Header */}
          <div className="h-16 md:h-14 bg-dark-900 border-b border-slate-700 flex items-center px-1 md:px-4 justify-between relative z-30">
            <div className="hidden md:flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            
            <div className="grid grid-cols-4 md:flex w-full md:w-auto gap-1 bg-dark-800 p-1 rounded-lg border border-slate-700">
              <button 
                onClick={() => setActiveTab('assistant')}
                className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 px-1 py-1 md:px-3 md:py-1.5 rounded transition-all ${activeTab === 'assistant' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Bot size={14} className="md:w-3.5 md:h-3.5" />
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap leading-none md:leading-normal text-center">연구 AI</span>
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 px-1 py-1 md:px-3 md:py-1.5 rounded transition-all ${activeTab === 'security' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <ShieldCheck size={14} className="md:w-3.5 md:h-3.5" />
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap leading-none md:leading-normal text-center">보안 이행</span>
              </button>
              <button 
                onClick={() => setActiveTab('monitoring')}
                className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 px-1 py-1 md:px-3 md:py-1.5 rounded transition-all ${activeTab === 'monitoring' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Activity size={14} className="md:w-3.5 md:h-3.5" />
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap leading-none md:leading-normal text-center">모니터링</span>
              </button>
              <button 
                onClick={() => setActiveTab('report')}
                className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 px-1 py-1 md:px-3 md:py-1.5 rounded transition-all ${activeTab === 'report' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Sparkles size={14} className="md:w-3.5 md:h-3.5" />
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap leading-none md:leading-normal text-center">AI 보고서</span>
              </button>
            </div>
            <div className="hidden md:block w-16"></div>
          </div>

          {/* Dashboard Body */}
          <div className="h-[400px] md:h-[500px] bg-dark-800 relative z-10 overflow-hidden">
             <AnimatePresence mode="wait">
               {activeTab === 'assistant' && <AssistantTab key="assistant" />}
               {activeTab === 'security' && <SecurityTab key="security" />}
               {activeTab === 'monitoring' && <MonitoringTab key="monitoring" />}
               {activeTab === 'report' && <ReportTab key="report" />}
             </AnimatePresence>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-8 text-center min-h-[48px] px-6">
            {activeTab === 'assistant' && (
                <p className="text-brand-400 animate-fade-in text-sm md:text-base">폐쇄형 SLLM으로 연구 데이터를 자산화하여 영속성을 확보합니다.</p>
            )}
             {activeTab === 'security' && (
                <p className="text-brand-400 animate-fade-in text-sm md:text-base">AI가 보안 규정을 분석하고 데이터 분류를 자동화합니다.</p>
            )}
             {activeTab === 'monitoring' && (
                <p className="text-brand-400 animate-fade-in text-sm md:text-base">파일 이동 경로 추적 및 비정상 외부 접속을 실시간으로 감시합니다.</p>
            )}
            {activeTab === 'report' && (
                <p className="text-indigo-400 animate-fade-in text-sm md:text-base">
                   <span className="font-bold mr-2 text-[10px] md:text-sm bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">업데이트 예정</span>
                   연구 진행 상황과 주요 성과를 AI가 자동으로 요약하여 보고서를 생성합니다.
                </p>
            )}
        </div>
      </div>
    </section>
  );
};

// --- Sub Components for Dashboard Tabs (Stay same, but ensure text-sm for better fit) ---
const AssistantTab = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-full"
        >
            <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
                <div className="flex justify-end">
                    <div className="bg-brand-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-2xl rounded-tr-none max-w-[85%] text-[11px] sm:text-sm">
                        작년 10월에 진행했던 합금 소재 강도 실험 데이터 어디에 있어?
                    </div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-start gap-2 sm:gap-3"
                >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mt-1 flex-shrink-0">
                        <Bot size={14} />
                    </div>
                    <div className="bg-slate-700 text-slate-200 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-tl-none max-w-[85%] text-[11px] sm:text-sm space-y-2 sm:space-y-3 shadow-lg">
                        <p>해당 실험 데이터는 <strong>2023_Alloy_Stress_Test</strong> 프로젝트 폴더 내에 아카이빙 되어 있습니다.</p>
                        <div className="bg-dark-900 rounded border border-slate-600 p-2 sm:p-3 flex items-center gap-2 sm:gap-3 hover:bg-dark-800 cursor-pointer transition-colors">
                            <FileText className="text-blue-400 shrink-0" size={16} />
                            <div className="overflow-hidden">
                                <div className="font-medium text-white truncate text-[10px] sm:text-xs">231015_Stress_Test_Result.xlsx</div>
                                <div className="text-[9px] sm:text-[10px] text-slate-500">서버 B / 14.5 MB / 김연구원 작성</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.5 }}
                     className="flex justify-end"
                >
                     <div className="bg-brand-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-2xl rounded-tr-none max-w-[85%] text-[11px] sm:text-sm">
                        그 실험의 주요 결론만 요약해줘.
                    </div>
                </motion.div>

                <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 2.2 }}
                     className="flex justify-start gap-2 sm:gap-3"
                >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mt-1 flex-shrink-0">
                         <Bot size={14} />
                    </div>
                     <div className="bg-slate-700 text-slate-200 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-tl-none max-w-[85%] text-[11px] sm:text-sm shadow-lg">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] sm:text-xs">요약 생성 중...</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="p-3 sm:p-4 border-t border-slate-700 bg-dark-900">
                <div className="relative">
                    <input 
                        type="text" 
                        disabled
                        placeholder="Core AI에게 연구 맥락을 질문하세요..." 
                        className="w-full bg-dark-800 border border-slate-600 rounded-lg pl-3 pr-10 py-2 sm:pl-4 sm:pr-12 sm:py-3 text-[11px] sm:text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-brand-500 hover:bg-brand-500/10 rounded-md">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const SecurityTab = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 md:p-6 h-full flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="w-full max-w-lg space-y-4 md:space-y-6">
                <div className="text-center mb-4 md:mb-8">
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 md:w-20 md:h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 border border-green-500/30"
                     >
                        <ShieldCheck className="w-6 h-6 md:w-10 md:h-10 text-green-500" />
                     </motion.div>
                     <h3 className="text-base md:text-xl font-bold text-white">실시간 보안 규정 준수 모니터링</h3>
                     <p className="text-slate-400 text-[10px] sm:text-xs mt-1">AI가 연구 데이터를 분석하여 보안 등급을 자동 분류합니다.</p>
                </div>

                <div className="bg-dark-900 rounded-lg border border-slate-700 p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-[10px] sm:text-xs font-medium">Compliance Score</span>
                        <span className="text-green-400 font-bold text-xs sm:text-sm">98/100</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-1.5 sm:h-2">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-green-500 h-full rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                        ></motion.div>
                    </div>
                </div>

                <div className="space-y-2">
                    {[
                        { name: "IP 보안 정책 검사", status: "pass" },
                        { name: "민감 데이터 암호화 여부", status: "pass" },
                        { name: "외부 저장매체 접근 제어", status: "warn" },
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-2 sm:p-3 bg-slate-800/50 rounded border border-slate-700/50"
                        >
                            <span className="text-[10px] sm:text-sm text-slate-300">{item.name}</span>
                            {item.status === 'pass' ? (
                                <span className="flex items-center text-[8px] sm:text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">
                                    <Check size={10} className="mr-1"/> PASSED
                                </span>
                            ) : (
                                <span className="flex items-center text-[8px] sm:text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                                    <AlertCircle size={10} className="mr-1"/> WARNING
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const MonitoringTab = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col p-4 md:p-6"
        >
            <div className="flex-1 bg-dark-900 rounded-lg border border-slate-700 relative overflow-hidden flex items-center justify-center">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
                     <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
                        </marker>
                     </defs>
                     <motion.line 
                        x1="20%" y1="50%" x2="50%" y2="50%" 
                        stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                     />
                     <motion.line 
                        x1="50%" y1="50%" x2="80%" y2="30%" 
                        stroke="#475569" strokeWidth="2" strokeDasharray="5,5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }}
                     />
                 </svg>

                 <div className="absolute left-[15%] top-1/2 -translate-y-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-brand-900/50 border border-brand-500 rounded-lg flex items-center justify-center mx-auto mb-1 md:mb-2 text-brand-400">
                        <HardDrive size={20} className="md:w-8 md:h-8" />
                    </div>
                    <span className="text-[8px] md:text-xs text-slate-400">Server A</span>
                 </div>

                 <div className="absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 text-white relative overflow-hidden">
                        <img src="https://picsum.photos/100?grayscale" className="w-full h-full rounded-full opacity-30 object-cover absolute inset-0" alt="User" />
                        <span className="relative z-10 font-bold text-[8px] md:text-xs">User</span>
                    </div>
                    <span className="text-[8px] md:text-xs text-slate-400">박연구원</span>
                 </div>

                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute left-[80%] top-[30%] -translate-y-1/2 -translate-x-1/2 text-center pointer-events-none"
                 >
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-red-500/10 border border-red-500 rounded-lg flex items-center justify-center mx-auto mb-1 md:mb-2 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse">
                        <AlertOctagon size={20} className="md:w-8 md:h-8" />
                    </div>
                    <span className="text-[8px] md:text-xs text-red-400 font-bold">Alien USB</span>
                 </motion.div>
                 
                 <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-4 sm:bottom-6 bg-red-500/90 text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-lg flex items-center gap-2 md:gap-3 backdrop-blur-sm border border-red-400/30 z-20"
                 >
                    <AlertTriangle size={14} className="md:w-5 md:h-5" />
                    <span className="text-[9px] md:text-sm font-semibold whitespace-nowrap">비인가 매체 이동 감지</span>
                 </motion.div>
            </div>
        </motion.div>
    );
};

const ReportTab = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-slate-50 relative overflow-hidden"
        >
            <div className="h-8 md:h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-4 relative z-20">
                 <div className="flex gap-1 flex-shrink-0">
                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-200 rounded-full"></div>
                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-200 rounded-full"></div>
                 </div>
                 <div className="flex-1 text-center text-[9px] sm:text-[10px] font-medium text-slate-500 truncate">보고서_샘플.pdf</div>
                 <div className="text-[9px] sm:text-[10px] text-brand-600 font-bold whitespace-nowrap">Saved</div>
            </div>

            <div className="flex-1 p-3 sm:p-4 md:p-8 overflow-hidden relative">
                 <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
                    <div className="bg-indigo-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg shadow-lg flex items-center gap-1.5 sm:gap-2 transform rotate-2 hover:rotate-0 transition-transform cursor-default scale-[0.6] sm:scale-100 origin-top-right">
                        <Clock size={12} />
                        <span className="text-[10px] sm:text-xs font-bold">Soon 2027</span>
                    </div>
                </div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl w-full max-w-2xl mx-auto h-full p-4 sm:p-6 md:p-8 relative blur-[0.5px] select-none border border-slate-200"
                >
                     <div className="border-b border-slate-800 pb-2 sm:pb-3 mb-3 sm:mb-4 flex justify-between items-end">
                         <div>
                             <h1 className="text-sm md:text-2xl font-bold text-slate-900">Research Report</h1>
                             <p className="text-[8px] md:text-[10px] text-slate-500">Author: Core AI</p>
                         </div>
                         <div className="hidden sm:block">
                             <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">CONFIDENTIAL</div>
                         </div>
                     </div>

                     <div className="space-y-3 sm:space-y-4">
                         <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.8 }}
                         >
                             <div className="h-2 bg-brand-600/10 rounded w-24 mb-1.5"></div>
                             <div className="space-y-1">
                                 <div className="h-1 bg-slate-100 rounded w-full"></div>
                                 <div className="h-1 bg-slate-100 rounded w-[90%]"></div>
                             </div>
                         </motion.div>

                         <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 1.5 }}
                            className="flex gap-3 sm:gap-4 mt-4"
                         >
                             <div className="flex-1">
                                 <div className="h-2 bg-brand-600/10 rounded w-20 mb-1.5"></div>
                                 <div className="space-y-1">
                                     <div className="h-1 bg-slate-100 rounded w-full"></div>
                                     <div className="h-1 bg-slate-100 rounded w-[80%]"></div>
                                 </div>
                             </div>
                             <div className="w-12 h-8 md:w-32 md:h-20 bg-slate-50 rounded border border-slate-100 flex items-center justify-center flex-shrink-0">
                                 <PieChart className="text-slate-200 w-4 h-4 md:w-8 md:h-8" />
                             </div>
                         </motion.div>
                     </div>
                </motion.div>
            </div>
        </motion.div>
    );
};