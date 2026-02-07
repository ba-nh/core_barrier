import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/30 border border-transparent",
    secondary: "bg-white text-brand-900 hover:bg-gray-50 border border-transparent",
    outline: "bg-transparent border border-slate-600 text-slate-200 hover:border-slate-400 hover:text-white",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/10"
  };

  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};