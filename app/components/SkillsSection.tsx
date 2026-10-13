'use client';

import React, { useState } from 'react';
import { soundFX } from './SoundEffects';
import { SparklesIcon } from './Icons';

type Skill = {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'ai' | 'databases';
  level: number;
  icon: string;
  tag: string;
  color: string;
};

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'frontend' | 'backend' | 'ai' | 'databases'>('all');

  const skills: Skill[] = [
    // Languages
    { name: 'TypeScript', category: 'languages', level: 96, icon: '💎', tag: 'Primary Language', color: 'border-blue-400 text-blue-300' },
    { name: 'JavaScript (ES6+)', category: 'languages', level: 98, icon: '⚡', tag: 'Core Web', color: 'border-yellow-400 text-yellow-300' },
    { name: 'Python', category: 'languages', level: 90, icon: '🐍', tag: 'AI & Scripting', color: 'border-emerald-400 text-emerald-300' },
    { name: 'SQL', category: 'languages', level: 92, icon: '🗄️', tag: 'Database Queries', color: 'border-cyan-400 text-cyan-300' },

    // Frontend
    { name: 'React.js & React 19', category: 'frontend', level: 98, icon: '⚛️', tag: 'Component Architecture', color: 'border-cyan-400 text-cyan-300' },
    { name: 'Next.js (App Router)', category: 'frontend', level: 96, icon: '▲', tag: 'SSR & Server Actions', color: 'border-purple-400 text-purple-300' },
    { name: 'Redux Toolkit', category: 'frontend', level: 92, icon: '🔄', tag: 'Global State', color: 'border-purple-400 text-purple-300' },
    { name: 'Tailwind CSS & shadcn/ui', category: 'frontend', level: 97, icon: '🎨', tag: 'Modern UI Systems', color: 'border-teal-400 text-teal-300' },
    { name: 'HTML5 & CSS3', category: 'frontend', level: 99, icon: '🌐', tag: 'Semantic & Responsive', color: 'border-amber-400 text-amber-300' },

    // Backend
    { name: 'Node.js & Express.js', category: 'backend', level: 94, icon: '🟢', tag: 'Server APIs', color: 'border-emerald-400 text-emerald-300' },
    { name: 'RESTful API Design', category: 'backend', level: 95, icon: '🔌', tag: 'Clean Endpoints', color: 'border-cyan-400 text-cyan-300' },
    { name: 'Socket.io (Real-Time)', category: 'backend', level: 92, icon: '⚡', tag: 'WebSockets & Chat', color: 'border-pink-400 text-pink-300' },
    { name: 'JWT Auth & OTP Flow', category: 'backend', level: 94, icon: '🛡️', tag: 'Security & Auth', color: 'border-rose-400 text-rose-300' },
    { name: 'Drizzle ORM & Zod', category: 'backend', level: 93, icon: '🧩', tag: 'Type-Safe Validation', color: 'border-blue-400 text-blue-300' },

    // AI / ML
    { name: 'Ollama & LLM Integration', category: 'ai', level: 92, icon: '🤖', tag: 'GrookAgent AI', color: 'border-purple-400 text-purple-300' },
    { name: 'AI Agent Workflows', category: 'ai', level: 94, icon: '🧠', tag: 'Autonomous Multi-Agent', color: 'border-cyan-400 text-cyan-300' },
    { name: 'TensorFlow & scikit-learn', category: 'ai', level: 86, icon: '🔬', tag: 'IBM Internship', color: 'border-amber-400 text-amber-300' },

    // Databases & Tools
    { name: 'PostgreSQL', category: 'databases', level: 94, icon: '🐘', tag: 'Relational DB', color: 'border-blue-400 text-blue-300' },
    { name: 'MongoDB', category: 'databases', level: 90, icon: '🍃', tag: 'NoSQL Document Store', color: 'border-emerald-400 text-emerald-300' },
    { name: 'Git & GitHub Workflows', category: 'databases', level: 96, icon: '🐙', tag: 'Version Control', color: 'border-slate-400 text-slate-300' },
    { name: 'Vercel Deployment', category: 'databases', level: 95, icon: '▲', tag: 'CI/CD & Edge Hosting', color: 'border-purple-400 text-purple-300' },
    { name: 'Cloudinary Media CDN', category: 'databases', level: 92, icon: '☁️', tag: 'Media Offloading', color: 'border-cyan-400 text-cyan-300' },
    { name: 'DSA & OOP Concepts', category: 'databases', level: 93, icon: '📐', tag: 'CS Fundamentals', color: 'border-amber-400 text-amber-300' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  const marqueeBadges = [
    '▲ Next.js', '💎 TypeScript', '⚛️ React 19', '🤖 Ollama AI', 
    '🐘 PostgreSQL', '🟢 Node.js', '⚡ Socket.io', '🎨 Tailwind CSS', 
    '🛡️ JWT & Zod', '🍃 MongoDB', '🧠 TensorFlow', '🐙 Git & GitHub'
  ];

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop-cyan">
            <SparklesIcon size={14} />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Skills &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">Technologies</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            Directly from Rishabh&apos;s active tech stack: typed schemas, full-stack JavaScript/TypeScript, and AI agent integration.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Skills' },
            { id: 'languages', label: 'Languages' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'ai', label: 'AI & ML' },
            { id: 'databases', label: 'Databases & Tools' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-pop-cyan -translate-y-1'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:border-slate-500 shadow-pop-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => soundFX.playPop()}
              className={`p-5 bg-slate-900 rounded-2xl border-2 ${skill.color.split(' ')[0]} shadow-pop hover:-translate-y-1.5 transition-all duration-200 cursor-default group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 bg-slate-800 rounded-xl border border-slate-700 group-hover:scale-125 transition-transform inline-block">
                  {skill.icon}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {skill.tag}
                </span>
              </div>

              <h4 className="text-base font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </h4>

              {/* Level Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                  <span>Proficiency</span>
                  <span className="font-mono text-white">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:opacity-100"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Moving 2D Marquee Ticker */}
        <div className="mt-16 overflow-hidden py-4 bg-slate-900/90 border-2 border-slate-700 rounded-2xl shadow-pop">
          <div className="animate-marquee flex gap-6 items-center whitespace-nowrap">
            {marqueeBadges.concat(marqueeBadges).map((text, idx) => (
              <span 
                key={idx}
                className="text-sm font-black tracking-wider text-slate-300 hover:text-cyan-400 px-4 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-1.5 cursor-default"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
