'use client';

import React from 'react';
import { soundFX } from './SoundEffects';
import { SparklesIcon, TrophyIcon, HeartIcon } from './Icons';

export const AboutSection: React.FC = () => {
  const statsList = [
    { name: 'Full Stack (Next.js & React)', level: 98, color: 'bg-cyan-400' },
    { name: 'TypeScript & Drizzle ORM', level: 95, color: 'bg-blue-400' },
    { name: 'Node.js, Express & REST APIs', level: 94, color: 'bg-emerald-400' },
    { name: 'Databases (PostgreSQL & MongoDB)', level: 92, color: 'bg-purple-400' },
    { name: 'AI / ML (Ollama, TensorFlow)', level: 90, color: 'bg-amber-400' },
    { name: 'Real-Time (Socket.io & JWT Auth)', level: 93, color: 'bg-pink-400' },
  ];

  const highlights = [
    {
      title: 'Full Stack & AI Architect',
      badge: 'EXPERTISE',
      emoji: '⚡',
      desc: 'MCA (AI & ML) graduate who ships TypeScript products end to end. Designed typed database layers with Drizzle ORM and integrated Ollama models to create autonomous multi-agent systems.',
      border: 'border-cyan-400',
      shadow: 'shadow-pop-cyan'
    },
    {
      title: 'Industry Experience: Resolute.ai & IBM',
      badge: 'EXPERIENCE',
      emoji: '💼',
      desc: 'Built reusable React components for AI web tools (tile counting & text extraction) at Resolute.ai. Trained TensorFlow multi-class vision models with 80% accuracy during an IBM internship.',
      border: 'border-purple-400',
      shadow: 'shadow-pop-purple'
    },
    {
      title: 'Academic Foundations: UPES & Tula\'s',
      badge: 'EDUCATION',
      emoji: '🎓',
      desc: 'Earned MCA (AI & ML) from University of Petroleum and Energy Studies, Dehradun (2023–2025) and BCA from Tula\'s Institute, Dehradun (2020–2023) with strong DSA & OOP fundamentals.',
      border: 'border-emerald-400',
      shadow: 'shadow-pop'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop-cyan">
            <SparklesIcon size={14} />
            <span>Developer Dossier</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Rishabh Rawat</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            Full Stack Developer specializing in AI-powered web applications, scalable database schemas, and responsive user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: RPG Character Sheet Card */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl border-2 border-purple-400 shadow-pop-purple p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-6 border-b-2 border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 border-2 border-white shadow-pop-sm flex items-center justify-center text-3xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Rishabh Rawat</h3>
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Full Stack &amp; AI Developer</p>
                  <p className="text-[11px] text-slate-400">Dehradun, Uttarakhand, India</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/40 rounded-xl text-xs font-bold">
                MCA (AI &amp; ML)
              </span>
            </div>

            {/* Health / Mana Gauge */}
            <div className="my-6 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <HeartIcon size={13} /> TYPE SAFETY (End-to-End)
                  </span>
                  <span className="text-slate-300">100%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div className="w-full h-full bg-emerald-400 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-cyan-400 flex items-center gap-1">
                    <SparklesIcon size={13} /> AI / ML INTEGRATION
                  </span>
                  <span className="text-slate-300">Ollama &bull; TensorFlow</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Skill Levels Radar/Bars */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <TrophyIcon size={14} /> Power Attributes
              </div>

              {statsList.map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                    <span>{stat.name}</span>
                    <span className="font-mono text-cyan-300">{stat.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className={`h-full ${stat.color} rounded-full transition-all duration-700`}
                      style={{ width: `${stat.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Badges */}
            <div className="mt-8 pt-6 border-t-2 border-slate-800 space-y-2">
              <div className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                Verified Certifications
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">React.js Certification</span>
                  <span className="text-cyan-400 font-mono text-[11px]">Great Learning</span>
                </div>
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Web App Technologies &amp; Django</span>
                  <span className="text-purple-400 font-mono text-[11px]">Coursera</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Highlights */}
          <div className="lg:col-span-7 space-y-6">
            {highlights.map((card, i) => (
              <div 
                key={i}
                onMouseEnter={() => soundFX.playPop()}
                className={`p-6 bg-slate-900 rounded-2xl border-2 ${card.border} ${card.shadow} hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{card.emoji}</span>
                  <span className="text-[11px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}

            {/* Contact & Resume summary */}
            <div className="p-6 bg-gradient-to-r from-purple-950/60 to-cyan-950/60 rounded-2xl border-2 border-cyan-400 shadow-pop-cyan">
              <h4 className="text-base font-black text-white mb-2">
                Ready to contribute to your engineering team
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Experienced in fast-paced remote environments, full-stack shipping, typed schemas, and AI agent workflows.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  rawatrishabh76@gmail.com • +91 8630127728
                </span>
                <a
                  href="#contact"
                  onClick={() => soundFX.playPop()}
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl shadow-pop-sm transition-all"
                >
                  Contact Rishabh →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
