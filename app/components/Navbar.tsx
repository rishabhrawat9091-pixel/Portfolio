'use client';

import React, { useState, useEffect } from 'react';
import { soundFX } from './SoundEffects';
import { Volume2Icon, VolumeXIcon, SparklesIcon } from './Icons';

export const Navbar: React.FC = () => {
  const [sfxActive, setSfxActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSfxActive(soundFX.isEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = soundFX.toggle();
    setSfxActive(nextState);
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2.5 bg-slate-950/90 backdrop-blur-md border-b-2 border-cyan-500/40 shadow-lg' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a 
            href="#home"
            onClick={() => soundFX.playPop()}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Animated 2D Avatar Badge */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 border-2 border-white shadow-pop-cyan group-hover:-translate-y-1 group-active:translate-y-0 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center overflow-hidden">
                <span className="text-xl group-hover:scale-125 transition-transform duration-200">
                  👾
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  RISHABH RAWAT
                </span>
                <span className="text-xs px-1.5 py-0.5 font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  FULLSTACK.AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Full Stack Developer &bull; Next.js &bull; AI</p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border-2 border-slate-700/70 p-1.5 rounded-2xl shadow-pop backdrop-blur-sm">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => soundFX.playPop()}
                className="px-3.5 py-1.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-150 relative group"
              >
                <span>{item.name}</span>
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Sound toggle + Hire Me CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* SFX Audio Button */}
            <button
              onClick={toggleSound}
              title={sfxActive ? 'Mute 2D Sound FX' : 'Enable 2D Sound FX'}
              className={`p-2 rounded-xl border-2 transition-all shadow-pop-sm flex items-center justify-center ${
                sfxActive 
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 hover:bg-cyan-500/25' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {sfxActive ? <Volume2Icon size={18} /> : <VolumeXIcon size={18} />}
            </button>

            {/* "Available" Beacon & Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => soundFX.playPowerUp()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm rounded-xl border-2 border-slate-950 shadow-pop-cyan hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
            >
              <SparklesIcon size={16} />
              <span>Let&apos;s Build!</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                soundFX.playBoop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 bg-slate-900 border-2 border-slate-700 text-slate-300 rounded-xl shadow-pop-sm"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-4 bg-slate-900 border-2 border-cyan-400 rounded-2xl shadow-pop-cyan animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  soundFX.playPop();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 text-base font-bold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="text-cyan-400">→</span>
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800">
              <a
                href="#contact"
                onClick={() => {
                  soundFX.playPowerUp();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black rounded-xl shadow-pop text-sm"
              >
                <SparklesIcon size={16} />
                <span>Let&apos;s Build Together!</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
