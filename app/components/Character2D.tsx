'use client';

import React, { useState, useEffect } from 'react';
import { soundFX } from './SoundEffects';

export const Character2D: React.FC = () => {
  const [mood, setMood] = useState<'coding' | 'vibing' | 'coffee' | 'debugging' | 'deploy'>('coding');
  const [speechText, setSpeechText] = useState("Hey there! Welcome to my 2D animated realm! 👋");
  const [dialogueCount, setDialogueCount] = useState(0);

  const moodDialogues: Record<string, string[]> = {
    coding: [
      "Configuring Drizzle ORM schemas & Next.js server actions! ⚡",
      "Building GrookAgent with autonomous AI agent workflows! 🤖",
      "End-to-end TypeScript from database to deployed UI! 🚀",
      "Writing clean React hooks and scalable Redux state! 💻"
    ],
    vibing: [
      "Lo-Fi beats + VS Code in Dehradun = Infinite flow state! 🎧",
      "Deploying high-speed edge apps on Vercel with zero downtime. 🌈",
      "Smooth 60fps micro-interactions make products joyful to use! ✨"
    ],
    coffee: [
      "Converting roasted coffee into typed PostgreSQL schemas! ☕",
      "Brewed up another full-stack feature for GrookAgent! ⚡",
      "Caffeine level: 100%. Type errors: 0! ♨️"
    ],
    debugging: [
      "Validating API requests with Zod schemas & reject bad input! 🛡️",
      "Debugging Socket.io real-time message streams with precision! 💬",
      "Zero console warnings allowed in this codebase! 🐛🔨"
    ],
    deploy: [
      "Live on grook-agent.vercel.app! Multi-agent AI ready to serve. 🚢",
      "Shipped with full sign-in flows and Ollama LLM integration! 🌍",
      "From Dehradun to global edge servers in milliseconds! ⚡"
    ]
  };

  const handleMoodChange = (newMood: 'coding' | 'vibing' | 'coffee' | 'debugging' | 'deploy') => {
    soundFX.playPop();
    setMood(newMood);
    const list = moodDialogues[newMood];
    const randomDialogue = list[Math.floor(Math.random() * list.length)];
    setSpeechText(randomDialogue);
  };

  const handlePokeCharacter = () => {
    soundFX.playBoop();
    setDialogueCount(prev => prev + 1);
    const pokes = [
      "Whoa! That tickles! 😄",
      "Click me again for more dev inspiration! ⚡",
      "Need a frontend wizard on your dream team? Let's talk! 🤝",
      "Did you know every pixel here is crafted with pure CSS & SVG? 🎨",
      "Check out my shipped projects below: GrookAgent & Velozity! 🚀"
    ];
    setSpeechText(pokes[dialogueCount % pokes.length]);
  };

  // Subtle random chatter timer
  useEffect(() => {
    const timer = setInterval(() => {
      const list = moodDialogues[mood];
      const randomDialogue = list[Math.floor(Math.random() * list.length)];
      setSpeechText(randomDialogue);
    }, 12000);
    return () => clearInterval(timer);
  }, [mood]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* 2D Speech Bubble */}
      <div 
        onClick={handlePokeCharacter}
        className="relative mb-3 max-w-sm px-5 py-3.5 bg-slate-900 border-2 border-cyan-400 rounded-2xl shadow-pop-cyan text-sm sm:text-base font-medium text-slate-100 cursor-pointer hover:scale-105 transition-all duration-200 animate-float-slow z-20"
      >
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold tracking-wide text-xs uppercase px-2 py-0.5 bg-cyan-950/80 rounded border border-cyan-400/40">
            {mood.toUpperCase()}
          </span>
          <span className="text-xs text-slate-400">Click to talk</span>
        </div>
        <p className="mt-1 text-slate-200 font-sans leading-snug">
          &ldquo;{speechText}&rdquo;
        </p>

        {/* Speech Bubble Arrow */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-cyan-400 rotate-45"></div>
      </div>

      {/* Main 2D Illustration Wrapper */}
      <div 
        onClick={handlePokeCharacter}
        className="relative group cursor-pointer transition-transform duration-200 active:scale-95"
        title="Click me!"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full scale-110 pointer-events-none"></div>

        {/* SVG 2D Character Canvas */}
        <svg
          viewBox="0 0 380 340"
          className="w-72 sm:w-88 md:w-96 h-auto drop-shadow-2xl transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Desk Surface */}
          <ellipse cx="190" cy="315" rx="160" ry="20" fill="#0f172a" stroke="#334155" strokeWidth="3" />
          <path d="M 50 315 L 330 315 L 340 330 L 40 330 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />

          {/* Chair Backrest */}
          <rect x="135" y="110" width="110" height="150" rx="20" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
          <rect x="145" y="125" width="90" height="120" rx="12" fill="#312e81" />

          {/* Character Body / Hoodie */}
          <path
            d="M 120 300 C 120 220, 150 190, 190 190 C 230 190, 260 220, 260 300 Z"
            fill={mood === 'deploy' ? '#059669' : mood === 'debugging' ? '#dc2626' : '#2563eb'}
            stroke="#0f172a"
            strokeWidth="4"
          />
          {/* Hoodie Strings */}
          <line x1="180" y1="210" x2="178" y2="245" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
          <line x1="200" y1="210" x2="202" y2="245" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
          <circle cx="178" cy="245" r="3" fill="#f8fafc" />
          <circle cx="202" cy="245" r="3" fill="#f8fafc" />

          {/* Head & Neck */}
          <rect x="180" y="180" width="20" height="25" rx="5" fill="#fbcfe8" stroke="#0f172a" strokeWidth="3" />
          
          {/* Face */}
          <circle cx="190" cy="155" r="42" fill="#fed7aa" stroke="#0f172a" strokeWidth="4" />

          {/* Hair */}
          <path
            d="M 148 150 C 148 115, 170 110, 190 110 C 215 110, 235 120, 232 155 C 225 140, 215 135, 195 135 C 175 135, 160 142, 148 150 Z"
            fill="#334155"
            stroke="#0f172a"
            strokeWidth="3"
          />
          {/* Hair Tufts */}
          <path d="M 175 112 Q 185 98 195 110" fill="#334155" stroke="#0f172a" strokeWidth="3" />
          <path d="M 190 110 Q 205 100 215 115" fill="#334155" stroke="#0f172a" strokeWidth="3" />

          {/* Cheeks blush */}
          <circle cx="165" cy="168" r="6" fill="#f43f5e" opacity="0.35" />
          <circle cx="215" cy="168" r="6" fill="#f43f5e" opacity="0.35" />

          {/* Eyes (Animated Blinking!) */}
          <g className="animate-blink" style={{ transformOrigin: '190px 155px' }}>
            {mood === 'vibing' ? (
              // Happy squint eyes
              <>
                <path d="M 166 156 Q 174 148 182 156" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 198 156 Q 206 148 214 156" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : mood === 'debugging' ? (
              // Focused laser eyes
              <>
                <circle cx="174" cy="155" r="6" fill="#0f172a" />
                <circle cx="172" cy="153" r="2.5" fill="#ffffff" />
                <circle cx="206" cy="155" r="6" fill="#0f172a" />
                <circle cx="204" cy="153" r="2.5" fill="#ffffff" />
                {/* Eyebrows angled */}
                <line x1="166" y1="145" x2="180" y2="148" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <line x1="214" y1="145" x2="200" y2="148" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              // Standard wide cute eyes
              <>
                <ellipse cx="174" cy="155" rx="5" ry="7" fill="#0f172a" />
                <circle cx="172" cy="153" r="2" fill="#ffffff" />
                <ellipse cx="206" cy="155" rx="5" ry="7" fill="#0f172a" />
                <circle cx="204" cy="153" r="2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Mouth */}
          {mood === 'coffee' ? (
            <path d="M 183 172 Q 190 180 197 172" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          ) : mood === 'vibing' ? (
            <path d="M 184 170 Q 190 178 196 170" fill="#f43f5e" stroke="#0f172a" strokeWidth="2.5" />
          ) : (
            <path d="M 184 172 Q 190 177 196 172" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          )}

          {/* Headphones */}
          <g>
            <path d="M 146 155 A 44 44 0 0 1 234 155" fill="none" stroke="#ec4899" strokeWidth="6" strokeLinecap="round" />
            <rect x="142" y="145" width="10" height="24" rx="5" fill="#f43f5e" stroke="#0f172a" strokeWidth="3" />
            <circle cx="147" cy="157" r="3" fill="#38bdf8" />
            <rect x="228" y="145" width="10" height="24" rx="5" fill="#f43f5e" stroke="#0f172a" strokeWidth="3" />
            <circle cx="233" cy="157" r="3" fill="#38bdf8" />
          </g>

          {/* Typing Arms & Hands (Animated Bobbing!) */}
          <g className="animate-typing">
            <path d="M 135 240 Q 155 260 170 280" fill="none" stroke="#2563eb" strokeWidth="18" strokeLinecap="round" />
            <circle cx="170" cy="280" r="9" fill="#fed7aa" stroke="#0f172a" strokeWidth="3" />

            <path d="M 245 240 Q 225 260 210 280" fill="none" stroke="#2563eb" strokeWidth="18" strokeLinecap="round" />
            <circle cx="210" cy="280" r="9" fill="#fed7aa" stroke="#0f172a" strokeWidth="3" />
          </g>

          {/* Glowing Laptop / Dual Monitors */}
          {/* Main Monitor */}
          <g>
            {/* Stand */}
            <rect x="183" y="270" width="14" height="24" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <path d="M 165 294 L 215 294" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

            {/* Screen frame */}
            <rect x="105" y="195" width="170" height="85" rx="8" fill="#020617" stroke="#38bdf8" strokeWidth="3" />
            
            {/* Screen Display (Simulated Code Lines) */}
            <rect x="110" y="200" width="160" height="75" rx="5" fill="#090d16" />
            {/* Code Lines glowing */}
            <line x1="118" y1="210" x2="160" y2="210" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
            <line x1="166" y1="210" x2="210" y2="210" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
            <line x1="124" y1="220" x2="195" y2="220" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <line x1="128" y1="230" x2="180" y2="230" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            <line x1="128" y1="240" x2="220" y2="240" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="124" y1="250" x2="170" y2="250" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
            <line x1="118" y1="260" x2="150" y2="260" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />

            {/* Glowing Cursor Blinking */}
            <rect x="156" y="258" width="4" height="7" fill="#22d3ee" className="animate-pulse" />
          </g>

          {/* Mechanical Keyboard on Desk */}
          <rect x="145" y="290" width="90" height="18" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <line x1="150" y1="295" x2="230" y2="295" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="150" y1="301" x2="230" y2="301" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" />

          {/* Desk Accessories: Coffee Cup with Rising Steam */}
          <g>
            <rect x="290" y="285" width="22" height="26" rx="4" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M 312 291 C 322 291, 322 303, 312 303" fill="none" stroke="#0f172a" strokeWidth="2.5" />
            {/* Coffee sticker */}
            <circle cx="301" cy="298" r="4" fill="#f59e0b" />
            {/* Rising Steam Animations */}
            <path d="M 295 280 Q 298 272 294 265" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" className="animate-steam" />
            <path d="M 303 279 Q 306 270 302 263" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" className="animate-steam-delay" />
          </g>

          {/* Desk Plant Companion */}
          <g>
            <path d="M 70 292 L 88 292 L 85 312 L 73 312 Z" fill="#ea580c" stroke="#0f172a" strokeWidth="2" />
            {/* Succulent Leaves */}
            <circle cx="79" cy="285" r="9" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
            <circle cx="73" cy="281" r="7" fill="#34d399" stroke="#0f172a" strokeWidth="2" />
            <circle cx="85" cy="281" r="7" fill="#34d399" stroke="#0f172a" strokeWidth="2" />
            <circle cx="79" cy="274" r="6" fill="#6ee7b7" stroke="#0f172a" strokeWidth="2" />
          </g>

          {/* Floating Sticker / Sparkles */}
          <g className="animate-float">
            <polygon points="60,140 64,152 76,156 64,160 60,172 56,160 44,156 56,152" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
          </g>
          <g className="animate-float-reverse">
            <polygon points="320,130 323,139 332,142 323,145 320,154 317,145 308,142 317,139" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Mood Selector Buttons Bar */}
      <div className="mt-4 flex flex-wrap justify-center items-center gap-2 p-1.5 bg-slate-900/90 border-2 border-slate-700/80 rounded-2xl shadow-pop">
        <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1">
          MOOD:
        </span>
        <button
          onClick={() => handleMoodChange('coding')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            mood === 'coding'
              ? 'bg-cyan-500 text-slate-950 shadow-pop-sm -translate-y-0.5'
              : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800'
          }`}
        >
          <span>⚡</span> Coding
        </button>
        <button
          onClick={() => handleMoodChange('vibing')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            mood === 'vibing'
              ? 'bg-purple-500 text-white shadow-pop-sm -translate-y-0.5'
              : 'text-slate-300 hover:text-purple-400 hover:bg-slate-800'
          }`}
        >
          <span>🎧</span> Vibing
        </button>
        <button
          onClick={() => handleMoodChange('coffee')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            mood === 'coffee'
              ? 'bg-amber-500 text-slate-950 shadow-pop-sm -translate-y-0.5'
              : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800'
          }`}
        >
          <span>☕</span> Coffee
        </button>
        <button
          onClick={() => handleMoodChange('debugging')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            mood === 'debugging'
              ? 'bg-rose-500 text-white shadow-pop-sm -translate-y-0.5'
              : 'text-slate-300 hover:text-rose-400 hover:bg-slate-800'
          }`}
        >
          <span>🐛</span> Hunting
        </button>
        <button
          onClick={() => handleMoodChange('deploy')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            mood === 'deploy'
              ? 'bg-emerald-500 text-slate-950 shadow-pop-sm -translate-y-0.5'
              : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
          }`}
        >
          <span>🚀</span> Deploy
        </button>
      </div>
    </div>
  );
};
