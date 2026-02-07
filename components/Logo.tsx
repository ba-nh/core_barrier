import React from 'react';
import { Shield, Hexagon } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon: Hexagon Shield (Barrier) protecting the Core */}
      <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-brand-500">
        {/* Outer Barrier */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full absolute inset-0 text-brand-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="fill-brand-900/20" />
        </svg>
        
        {/* Inner Core */}
        <div className="relative z-10 w-3 h-3 bg-brand-400 rounded-sm rotate-45 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        
        {/* Circuit lines connecting core to barrier */}
        <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full opacity-60">
            <path d="M12 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      
      <span className="font-bold text-xl tracking-tight text-white">
        Core <span className="text-brand-500">BArrier</span>
      </span>
    </div>
  );
};