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
          <p className="text-slate-400 max-w-2xl mx-auto">
            인력이 바뀌어도 연구의 맥락과 책임이 끊기지 않도록.<br/>
            Core Barrier는 당신의 연구실을 <strong>기억하고 설명 가능한 조직</strong>으로 만듭니다.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="max-w-5xl mx-auto bg-dark-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden ring-1 ring-white/10">
          
          {/* Mac-style Header */}
          <div className="h-14 bg-dark-900 border-b border-slate-700 flex items-center px-4 justify-between overflow-x-auto no-scrollbar">
            <div className="hidden md:flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            
            <div className="flex gap-1 bg-dark-800 p-1 rounded-lg border border-slate-700 mx-auto md:mx-0 min-w-max">
              <button 
                onClick={() => setActiveTab('assistant')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'assistant' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Bot size={14}/> 연구 어시스턴트
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'security' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <ShieldCheck size={14}/> 보안 이행
              </button>
              <button 
                onClick={() => setActiveTab('monitoring')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'monitoring' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Activity size={14}/> 데이터 모니터링
              </button>
               <button 
                onClick={() => setActiveTab('report')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'report' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Sparkles size={14}/> AI 보고서
              </button>
            </div>
            <div className="hidden md:block w-16"></div> {/* Spacer for alignment */}
          </div>

          {/* Dashboard Body */}
          <div className="h-[400px] md:h-[500px] bg-dark-800 relative">
             <AnimatePresence mode="wait">
               {activeTab === 'assistant' && <AssistantTab key="assistant" />}
               {activeTab === 'security' && <SecurityTab key="security" />}
               {activeTab === 'monitoring' && <MonitoringTab key="monitoring" />}
               {activeTab === 'report' && <ReportTab key="report" />}
             </AnimatePresence>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-8 text-center min-h-[24px]">
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
                   <span className="font-bold mr-2">[업데이트 예정]</span>
                   연구 진행 상황과 주요 성과를 AI가 자동으로 요약하여 보고서를 생성합니다.
                </p>
            )}
        </div>
      </div>
    </section>
  );
};

// --- Sub Components for Dashboard Tabs ---

const AssistantTab = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-full"
        >
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="flex justify-end">
                    <div className="bg-brand-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
                        작년 10월에 진행했던 합금 소재 강도 실험 데이터 어디에 있어?
                    </div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-start gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mt-1">
                        <Bot size={16} />
                    </div>
                    <div className="bg-slate-700 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm space-y-3 shadow-lg">
                        <p>해당 실험 데이터는 <strong>2023_Alloy_Stress_Test</strong> 프로젝트 폴더 내에 아카이빙 되어 있습니다.</p>
                        <div className="bg-dark-900 rounded border border-slate-600 p-3 flex items-center gap-3 hover:bg-dark-800 cursor-pointer transition-colors">
                            <FileText className="text-blue-400" size={20} />
                            <div className="overflow-hidden">
                                <div className="font-medium text-white truncate">231015_Stress_Test_Result.xlsx</div>
                                <div className="text-xs text-slate-500">서버 B / 14.5 MB / 김연구원 작성</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">연관된 실험 노트 페이지: p.45 ~ p.52</p>
                    </div>
                </motion.div>
                
                <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.5 }}
                     className="flex justify-end"
                >
                     <div className="bg-brand-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
                        그 실험의 주요 결론만 요약해줘.
                    </div>
                </motion.div>

                <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 2.2 }}
                     className="flex justify-start gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mt-1">
                         <Bot size={16} />
                    </div>
                     <div className="bg-slate-700 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-lg">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                            <span>요약 생성 중...</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="p-4 border-t border-slate-700 bg-dark-900">
                <div className="relative">
                    <input 
                        type="text" 
                        disabled
                        placeholder="Core AI에게 연구 맥락을 질문하세요..." 
                        className="w-full bg-dark-800 border border-slate-600 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-500 hover:bg-brand-500/10 rounded-md">
                        <Send size={18} />
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
            className="p-6 h-full flex flex-col items-center justify-center"
        >
            <div className="w-full max-w-lg space-y-6">
                <div className="text-center mb-8">
                     <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30"
                     >
                        <ShieldCheck className="w-10 h-10 text-green-500" />
                     </motion.div>
                     <h3 className="text-xl font-bold text-white">실시간 보안 규정 준수 모니터링</h3>
                     <p className="text-slate-400 text-sm mt-1">AI가 연구 데이터를 분석하여 보안 등급을 자동 분류합니다.</p>
                </div>

                <div className="bg-dark-900 rounded-lg border border-slate-700 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm font-medium">Compliance Score</span>
                        <span className="text-green-400 font-bold">98/100</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-2">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-green-500 h-2 rounded-full"
                        ></motion.div>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { name: "IP 보안 정책 검사", status: "pass" },
                        { name: "민감 데이터 암호화 여부", status: "pass" },
                        { name: "외부 저장매체 접근 제어", status: "warn" },
                        { name: "클라우드 업로드 패턴 분석", status: "pass" },
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50"
                        >
                            <span className="text-sm text-slate-300">{item.name}</span>
                            {item.status === 'pass' ? (
                                <span className="flex items-center text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                                    <Check size={12} className="mr-1"/> PASSED
                                </span>
                            ) : (
                                <span className="flex items-center text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                                    <AlertCircle size={12} className="mr-1"/> WARNING
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
            className="h-full flex flex-col p-6"
        >
            <div className="flex-1 bg-dark-900 rounded-lg border border-slate-700 relative overflow-hidden flex items-center justify-center">
                 {/* Visual Graph Nodes Simulation */}
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

                 {/* Node 1: Origin */}
                 <div className="absolute left-[15%] top-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
                    <div className="w-16 h-16 bg-brand-900/50 border border-brand-500 rounded-lg flex items-center justify-center mx-auto mb-2 text-brand-400">
                        <HardDrive size={32} />
                    </div>
                    <span className="text-xs text-slate-400">Lab Server A</span>
                 </div>

                 {/* Node 2: User */}
                 <div className="absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white relative">
                        <img src="https://picsum.photos/100?grayscale" className="w-full h-full rounded-full opacity-50 object-cover absolute inset-0" alt="User" />
                        <span className="relative z-10 font-bold">User</span>
                    </div>
                    <span className="text-xs text-slate-400">박연구원 (Desktop-04)</span>
                 </div>

                 {/* Node 3: External (Alert) */}
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute left-[80%] top-[30%] -translate-y-1/2 -translate-x-1/2 text-center"
                 >
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500 rounded-lg flex items-center justify-center mx-auto mb-2 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse">
                        <AlertOctagon size={32} />
                    </div>
                    <span className="text-xs text-red-400 font-bold">Unauthorized USB</span>
                 </motion.div>
                 
                 {/* Alert Banner */}
                 <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-6 bg-red-500/90 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-sm"
                 >
                    <AlertTriangle size={20} />
                    <span className="text-sm font-semibold">비인가 저장매체 파일 이동 감지 (project_alpha.zip)</span>
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
            className="flex flex-col h-full bg-slate-50 relative"
        >
            {/* Toolbar */}
            <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-4">
                 <div className="flex gap-1">
                     <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                     <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                 </div>
                 <div className="flex-1 text-center text-xs font-medium text-slate-500">2024년_2월_연구_진행_보고서.pdf</div>
                 <div className="text-xs text-brand-600 font-bold">Autosaved</div>
            </div>

            <div className="flex-1 p-8 overflow-hidden relative">
                {/* Coming Soon Overlay */}
                 <div className="absolute top-10 right-10 z-20">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform cursor-default">
                        <Clock size={16} />
                        <span className="text-sm font-bold">Coming Soon 2027</span>
                    </div>
                </div>

                {/* Paper */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl w-full max-w-2xl mx-auto h-full p-8 relative blur-[1px] select-none"
                >
                     {/* Header */}
                     <div className="border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-end">
                         <div>
                             <h1 className="text-2xl font-bold text-slate-900">Weekly Research Report</h1>
                             <p className="text-sm text-slate-500">Date: 2024.02.15 | Author: Core AI</p>
                         </div>
                         <div className="text-right">
                             <div className="text-xs font-bold text-slate-400 uppercase">CONFIDENTIAL</div>
                         </div>
                     </div>

                     {/* Content Generation Animation */}
                     <div className="space-y-4">
                         {/* Section 1 */}
                         <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.8 }}
                         >
                             <h3 className="text-sm font-bold text-brand-600 mb-2">1. 주요 연구 활동 요약</h3>
                             <div className="space-y-2">
                                 <div className="h-2 bg-slate-200 rounded w-full"></div>
                                 <div className="h-2 bg-slate-200 rounded w-[90%]"></div>
                                 <div className="h-2 bg-slate-200 rounded w-[95%]"></div>
                             </div>
                         </motion.div>

                         {/* Section 2 */}
                         <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 1.5 }}
                            className="flex gap-4 mt-6"
                         >
                             <div className="flex-1">
                                 <h3 className="text-sm font-bold text-brand-600 mb-2">2. 데이터 분석 결과</h3>
                                 <div className="space-y-2">
                                     <div className="h-2 bg-slate-200 rounded w-full"></div>
                                     <div className="h-2 bg-slate-200 rounded w-[80%]"></div>
                                 </div>
                             </div>
                             <div className="w-32 h-20 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                                 <PieChart className="text-slate-300" />
                             </div>
                         </motion.div>

                         {/* Typing Cursor Effect */}
                         <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 2.5 }}
                             className="flex items-center gap-2 mt-6 text-brand-600"
                         >
                             <Sparkles size={16} />
                             <span className="text-xs font-medium">AI가 결론 및 제언을 작성 중입니다...</span>
                             <span className="w-1.5 h-4 bg-brand-600 animate-pulse"></span>
                         </motion.div>
                     </div>
                </motion.div>
                
                {/* Floating Action Button simulation */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3 }}
                    className="absolute bottom-8 right-8 grayscale opacity-50"
                >
                    <button className="bg-brand-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 cursor-not-allowed">
                        <Check size={16} />
                        <span className="text-sm font-bold">보고서 승인</span>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};