
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`space-y-5 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-16 bg-emerald-500 rounded-full ${centered ? 'mx-auto' : ''} mt-8`}></div>
    </div>
  );
};

export default SectionHeader;
