'use client';

import React, { useState } from 'react';
import { soundFX } from './SoundEffects';
import { RocketIcon, HeartIcon, SparklesIcon, GithubIcon, LinkedinIcon, BriefcaseIcon } from './Icons';

export const Footer: React.FC = () => {
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  const scrollToTop = () => {
    soundFX.playPowerUp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEasterEgg = () => {
    soundFX.playBoop();
    setEasterEggClicks(prev => prev + 1);
  };

  return (
    <footer className="py-12 bg-slate-950 border-t-2 border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div 
              onClick={handleEasterEgg}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 border-2 border-white shadow-pop-sm flex items-center justify-center cursor-pointer hover:rotate-12 transition-transform"
              title="Click for surprise!"
            >
              <span className="text-lg">👾</span>
            </div>
            <div>
              <h4 className="text-base font-black text-white">RISHABH RAWAT</h4>
              <p className="text-xs text-slate-400">Full Stack Developer &bull; MCA (AI &amp; ML)</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rishabhrawat9091-pixel"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playPop()}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              title="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://linkedin.com/in/rishabh-rawat-2b6357219"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playPop()}
              className="text-slate-400 hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="https://leetcode.com/u/dDXdYLWDRf"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playPop()}
              className="text-slate-400 hover:text-amber-400 transition-colors"
              title="LeetCode"
            >
              <span className="font-mono text-sm font-black">&lt;/&gt;</span>
            </a>
            <a
              href="https://www.naukri.com/mnjuser/profile"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playPop()}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
              title="Naukri.com Profile"
            >
              <BriefcaseIcon size={20} />
            </a>
          </div>

          {/* Rocket Back-to-Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs rounded-xl border-2 border-cyan-400 shadow-pop-cyan hover:-translate-y-1 active:translate-y-0.5 transition-all"
          >
            <RocketIcon size={16} />
            <span>Launch To Orbit</span>
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            Designed &amp; Coded with{' '}
            <HeartIcon size={14} className="text-pink-500 fill-pink-500 animate-pulse" />{' '}
            by Rishabh Rawat &bull; Dehradun, India
          </p>

          <p className="font-mono text-[11px] text-slate-500">
            Next.js &bull; TypeScript &bull; PostgreSQL &bull; Ollama AI &bull; 60 FPS
          </p>

          {easterEggClicks > 0 && (
            <div className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono">
              Easter egg unlocked! ({easterEggClicks} claps) 🎉
            </div>
          )}
        </div>

      </div>
    </footer>
  );
};
