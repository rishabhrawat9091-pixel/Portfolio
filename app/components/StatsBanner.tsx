'use client';

import React from 'react';
import { soundFX } from './SoundEffects';
import { RocketIcon, ZapIcon, TrophyIcon, CodeIcon } from './Icons';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      label: 'Full-Stack Products',
      value: '3+',
      sub: 'GrookAgent, Velozity & GrossApp',
      icon: <RocketIcon size={24} className="text-cyan-400" />,
      border: 'border-cyan-400',
      shadow: 'shadow-pop-cyan',
      tag: 'DEPLOYED'
    },
    {
      label: 'ML Accuracy (IBM)',
      value: '80%',
      sub: 'Multi-class Lung Disease Classifier',
      icon: <TrophyIcon size={24} className="text-amber-400" />,
      border: 'border-amber-400',
      shadow: 'shadow-pop-amber',
      tag: 'RESEARCH'
    },
    {
      label: 'Type-Safe Architecture',
      value: '100%',
      sub: 'TypeScript, Drizzle & Zod validation',
      icon: <CodeIcon size={24} className="text-purple-400" />,
      border: 'border-purple-400',
      shadow: 'shadow-pop-purple',
      tag: 'CODE QUALITY'
    },
    {
      label: 'Real-Time & AI Systems',
      value: 'Instant',
      sub: 'Socket.io messaging & Ollama LLM',
      icon: <ZapIcon size={24} className="text-rose-400" />,
      border: 'border-rose-400',
      shadow: 'shadow-pop-pink',
      tag: 'ARCHITECTURE'
    }
  ];

  return (
    <section className="py-12 bg-slate-950/60 border-y-2 border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFX.playPop()}
              className={`p-6 bg-slate-900 rounded-2xl border-2 ${item.border} ${item.shadow} hover:-translate-y-1.5 transition-all duration-200 cursor-default group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {item.tag}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                {item.value}
              </div>
              <div className="text-sm font-bold text-slate-200">
                {item.label}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
