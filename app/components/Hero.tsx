'use client';

import React, { useState, useEffect } from 'react';
import { Character2D } from './Character2D';
import { soundFX } from './SoundEffects';
import { 
  RocketIcon, 
  GamepadIcon, 
  GithubIcon, 
  LinkedinIcon, 
  MailIcon, 
  SparklesIcon,
  LeetCodeIcon,
  BriefcaseIcon,
} from './Icons';

export const Hero: React.FC = () => {
  const roles = [
    "Full Stack Developer",
    "AI-Powered Apps Builder",
    "Next.js & TypeScript Wizard",
    "Velozity & GrookAgent Creator"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Background 2D floating elements */}
      <div className="absolute top-20 left-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-20 right-10 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse"></div>
      
      {/* Floating 2D doodles */}
      <div className="hidden lg:block absolute top-32 left-[12%] text-cyan-400 font-mono text-sm opacity-60 animate-float select-none">
        &lt;FullStack AI=&quot;Ollama&quot; /&gt;
      </div>
      <div className="hidden lg:block absolute bottom-28 left-[8%] text-purple-400 font-mono text-sm opacity-60 animate-float-reverse select-none">
        schema.drizzle.migrate()
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Status Pill Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-pop-cyan hover:scale-105 transition-transform cursor-default">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-black tracking-wide text-cyan-300 uppercase">
                  Available for Full-Time &amp; Roles
                </span>
                <SparklesIcon size={14} className="text-amber-400" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border-2 border-slate-700 text-slate-300 text-xs font-bold shadow-pop-sm">
                <span>📍</span>
                <span>Dehradun, India</span>
              </div>
            </div>

            {/* Main Greeting & Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">Rishabh Rawat</span>
              <span className="inline-block animate-wiggle ml-2">👋</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-slate-300 font-extrabold block mt-2">
                I build{' '}
                <span className="inline-block px-3 py-1 bg-purple-950/80 text-purple-300 border-2 border-purple-400 rounded-xl shadow-pop-purple transition-all duration-300 min-w-[280px]">
                  {roles[roleIndex]}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
              Full Stack Developer <span className="text-cyan-300 font-semibold">(MCA in AI &amp; ML)</span> who ships TypeScript products end-to-end, from typed database schemas to deployed UIs. Creator of <span className="text-purple-300 font-semibold">GrookAgent</span> (Multi-Agent AI Platform) and <span className="text-cyan-300 font-semibold">Velozity Solutions</span> (Client Project Dashboard).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={() => soundFX.playPowerUp()}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-base rounded-2xl border-2 border-slate-950 shadow-pop-cyan hover:-translate-y-1 active:translate-y-0.5 transition-all"
              >
                <RocketIcon size={20} />
                <span>Explore Projects</span>
              </a>

              <a
                href="#skills"
                onClick={() => soundFX.playPop()}
                className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-base rounded-2xl border-2 border-purple-950 shadow-pop-purple hover:-translate-y-1 active:translate-y-0.5 transition-all"
              >
                <SparklesIcon size={18} />
                <span>Technical Skills</span>
              </a>

              <a
                href="#contact"
                onClick={() => soundFX.playBoop()}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-base rounded-2xl border-2 border-slate-700 shadow-pop hover:-translate-y-1 active:translate-y-0.5 transition-all"
              >
                <MailIcon size={18} />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Contact Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-slate-800/80 w-full justify-center lg:justify-start">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                Profiles:
              </span>
              <a
                href="https://github.com/rishabhrawat9091-pixel"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playPop()}
                className="p-2.5 bg-slate-900 border-2 border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 rounded-xl shadow-pop-sm hover:-translate-y-1 transition-all flex items-center gap-1.5 text-xs font-bold"
                title="GitHub"
              >
                <GithubIcon size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/rishabh-rawat-2b6357219"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playPop()}
                className="p-2.5 bg-slate-900 border-2 border-slate-700 hover:border-blue-400 text-slate-300 hover:text-blue-400 rounded-xl shadow-pop-sm hover:-translate-y-1 transition-all flex items-center gap-1.5 text-xs font-bold"
                title="LinkedIn"
              >
                <LinkedinIcon size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/u/dDXdYLWDRf"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playPop()}
                className="p-2.5 bg-slate-900 border-2 border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-400 rounded-xl shadow-pop-sm hover:-translate-y-1 transition-all flex items-center gap-1.5 text-xs font-bold"
                title="LeetCode"
              >
                <LeetCodeIcon size={18} />
                <span className="hidden sm:inline">LeetCode</span>
              </a>
              <a
                href="https://www.naukri.com/mnjuser/profile"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playPop()}
                className="p-2.5 bg-slate-900 border-2 border-slate-700 hover:border-blue-400 text-slate-300 hover:text-cyan-300 rounded-xl shadow-pop-sm hover:-translate-y-1 transition-all flex items-center gap-1.5 text-xs font-bold"
                title="Naukri.com Profile"
              >
                <BriefcaseIcon size={18} />
                <span className="hidden sm:inline">Naukri.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2D Animated Character Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Floating Tech Badges orbiting the character */}
            <div className="absolute -top-4 -left-6 z-20 hidden sm:block animate-float">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border-2 border-cyan-400 rounded-xl shadow-pop-cyan text-xs font-black text-cyan-300">
                <span>🤖</span> GrookAgent AI
              </div>
            </div>

            <div className="absolute top-1/4 -right-8 z-20 hidden sm:block animate-float-reverse">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border-2 border-purple-400 rounded-xl shadow-pop-purple text-xs font-black text-purple-300">
                <span>📊</span> Velozity Dashboard
              </div>
            </div>

            <div className="absolute bottom-16 -left-8 z-20 hidden sm:block animate-float-slow">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border-2 border-pink-400 rounded-xl shadow-pop-pink text-xs font-black text-pink-300">
                <span>▲</span> Next.js &amp; Drizzle
              </div>
            </div>

            <div className="absolute bottom-24 -right-6 z-20 hidden sm:block animate-float">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border-2 border-emerald-400 rounded-xl shadow-pop text-xs font-black text-emerald-300">
                <span>🐘</span> PostgreSQL
              </div>
            </div>

            {/* The 2D Character Component */}
            <Character2D />
          </div>

        </div>
      </div>
    </section>
  );
};
