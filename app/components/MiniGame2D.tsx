'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from './SoundEffects';
import { GamepadIcon, BugIcon, TrophyIcon, SparklesIcon } from './Icons';

type Bug = {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  type: 'crawler' | 'spider' | 'glitch';
  size: number;
  isSquashed: boolean;
  squashedAt?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

export const MiniGame2D: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bugsRef = useRef<Bug[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const nextBugId = useRef(1);

  // Load high score
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_bug_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Spawn a bug
  const spawnBug = useCallback((width: number, height: number) => {
    const types: ('crawler' | 'spider' | 'glitch')[] = ['crawler', 'spider', 'glitch'];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

    let startX = 0;
    let startY = 0;
    let speedX = (Math.random() - 0.5) * 3;
    let speedY = (Math.random() - 0.5) * 3;

    if (edge === 0) { startX = Math.random() * width; startY = 10; speedY = Math.abs(speedY) + 1; }
    else if (edge === 1) { startX = width - 10; startY = Math.random() * height; speedX = -(Math.abs(speedX) + 1); }
    else if (edge === 2) { startX = Math.random() * width; startY = height - 10; speedY = -(Math.abs(speedY) + 1); }
    else { startX = 10; startY = Math.random() * height; speedX = Math.abs(speedX) + 1; }

    const newBug: Bug = {
      id: nextBugId.current++,
      x: startX,
      y: startY,
      speedX: speedX === 0 ? 1 : speedX,
      speedY: speedY === 0 ? 1 : speedY,
      type: chosenType,
      size: chosenType === 'glitch' ? 20 : chosenType === 'spider' ? 24 : 28,
      isSquashed: false,
    };

    bugsRef.current.push(newBug);
  }, []);

  const createSquashParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5);
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color,
      });
    }
  };

  const handleStartGame = () => {
    soundFX.playPowerUp();
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCombo(1);
    setTimeLeft(30);
    bugsRef.current = [];
    particlesRef.current = [];
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          setIsPlaying(false);
          soundFX.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_bug_highscore', String(score));
      }
    }
  }, [score, highScore]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastSpawnTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle retro grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (isPlaying) {
        // Spawn bugs periodically
        if (time - lastSpawnTime > 650 && bugsRef.current.length < 12) {
          spawnBug(canvas.width, canvas.height);
          lastSpawnTime = time;
        }

        // Update and draw bugs
        bugsRef.current.forEach(bug => {
          if (!bug.isSquashed) {
            bug.x += bug.speedX;
            bug.y += bug.speedY;

            // Bounce off boundaries
            if (bug.x < 15 || bug.x > canvas.width - 15) bug.speedX *= -1;
            if (bug.y < 15 || bug.y > canvas.height - 15) bug.speedY *= -1;

            // Draw bug
            ctx.save();
            ctx.translate(bug.x, bug.y);
            const angle = Math.atan2(bug.speedY, bug.speedX);
            ctx.rotate(angle);

            // Bug Body
            const bodyColor = bug.type === 'glitch' ? '#ec4899' : bug.type === 'spider' ? '#8b5cf6' : '#06b6d4';
            ctx.fillStyle = bodyColor;
            ctx.strokeStyle = '#020617';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.ellipse(0, 0, bug.size / 2, bug.size / 2.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Bug Head
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(bug.size / 2.5, 0, bug.size / 4, 0, Math.PI * 2);
            ctx.fill();

            // Legs
            ctx.strokeStyle = bodyColor;
            ctx.lineWidth = 2.5;
            for (let i = -1; i <= 1; i++) {
              ctx.beginPath();
              ctx.moveTo(i * 5, -bug.size / 3);
              ctx.lineTo(i * 8, -bug.size * 0.7);
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(i * 5, bug.size / 3);
              ctx.lineTo(i * 8, bug.size * 0.7);
              ctx.stroke();
            }

            ctx.restore();
          } else {
            // Squashed splat
            ctx.save();
            ctx.translate(bug.x, bug.y);
            ctx.fillStyle = bug.type === 'glitch' ? '#ec4899' : bug.type === 'spider' ? '#8b5cf6' : '#06b6d4';
            ctx.beginPath();
            ctx.arc(0, 0, bug.size / 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        // Filter out expired squashed bugs
        const now = Date.now();
        bugsRef.current = bugsRef.current.filter(b => !b.isSquashed || (now - (b.squashedAt || 0) < 600));

        // Update and draw particles
        particlesRef.current.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.035;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, spawnBug]);

  // Click on bug to squash!
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    let hit = false;
    bugsRef.current.forEach(bug => {
      if (!bug.isSquashed) {
        const dist = Math.hypot(bug.x - clickX, bug.y - clickY);
        if (dist < bug.size * 1.2) {
          hit = true;
          bug.isSquashed = true;
          bug.squashedAt = Date.now();

          soundFX.playSquash();
          const color = bug.type === 'glitch' ? '#ec4899' : bug.type === 'spider' ? '#8b5cf6' : '#06b6d4';
          createSquashParticles(bug.x, bug.y, color);

          const points = bug.type === 'glitch' ? 150 : bug.type === 'spider' ? 120 : 100;
          setScore(prev => prev + points * combo);
          setCombo(prev => Math.min(prev + 1, 5));
        }
      }
    });

    if (!hit) {
      setCombo(1);
    }
  };

  const getRank = () => {
    if (score >= 3500) return '🏆 Principal Bug Annihilator';
    if (score >= 2000) return '⭐ Senior Code Exterminator';
    if (score >= 1000) return '⚡ Junior Debugger Specialist';
    return '🌱 Bug Catcher In Training';
  };

  return (
    <section id="minigame" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-purple-400 text-purple-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop-purple">
            <GamepadIcon size={14} />
            <span>Interactive Playground</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Bug Blaster <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">2D Arcade</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            Test your reflexes! Squash crawling bugs before time runs out to earn your official debugging rank.
          </p>
        </div>

        {/* Arcade Cabinet Container */}
        <div className="bg-slate-900 rounded-3xl border-4 border-purple-500 shadow-pop-purple p-4 sm:p-6 relative overflow-hidden">
          
          {/* Top HUD Display */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950 rounded-2xl border-2 border-slate-800 mb-4 font-mono">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">SCORE</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400">{score}</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-[10px] text-slate-400 block font-sans">HIGH SCORE</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">{highScore}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {combo > 1 && (
                <div className="px-2.5 py-1 bg-pink-500/20 text-pink-400 rounded-lg border border-pink-400/40 text-xs font-bold animate-pulse font-sans">
                  {combo}x COMBO! 🔥
                </div>
              )}
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-sans">TIME LEFT</span>
                <span className={`text-xl sm:text-2xl font-black ${timeLeft <= 5 ? 'text-rose-500 animate-ping' : 'text-emerald-400'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Canvas Arena */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={750}
              height={380}
              onClick={handleCanvasClick}
              className="w-full h-auto aspect-[750/380] cursor-crosshair block select-none"
            />

            {/* Overlay if not playing */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-3xl mb-4 shadow-pop-purple animate-bounce">
                  👾
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Ready to Squash Some Bugs?</h3>
                <p className="text-slate-300 text-sm max-w-sm mb-6">
                  Click or tap any crawling bugs to squash them. Maintain streaks for massive multiplier combos!
                </p>
                <button
                  onClick={handleStartGame}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-base rounded-2xl border-2 border-white shadow-pop-purple hover:-translate-y-1 active:translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <GamepadIcon size={20} />
                  <span>START ROUND</span>
                </button>
              </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mb-3 shadow-pop-amber">
                  🏆
                </div>
                <h3 className="text-3xl font-black text-white mb-1">Time&apos;s Up!</h3>
                <p className="text-cyan-300 font-mono text-xl font-bold mb-2">Final Score: {score}</p>
                <div className="px-4 py-2 bg-slate-900 border border-purple-400 rounded-xl text-sm font-bold text-purple-300 mb-6">
                  Rank Achieved: {getRank()}
                </div>
                <button
                  onClick={handleStartGame}
                  className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-base rounded-2xl border-2 border-slate-950 shadow-pop-cyan hover:-translate-y-1 active:translate-y-0.5 transition-all"
                >
                  PLAY AGAIN 🚀
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar Info */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-2 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Crawler: 100pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> Spider: 120pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span> Glitch: 150pts
            </span>
            <span className="text-slate-500 font-sans">Click fast for 5x combos!</span>
          </div>

        </div>

      </div>
    </section>
  );
};
