'use client';

import React from 'react';
import { soundFX } from './SoundEffects';
import { SparklesIcon, StarIcon } from './Icons';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Head of Product at NexusLab',
      avatar: '👩‍💼',
      quote: 'Rishabh turned our sluggish web dashboard into an electrifying, silky-smooth 60fps experience. His sense of 2D micro-animation and component architecture is simply world class!',
      border: 'border-cyan-400',
      shadow: 'shadow-pop-cyan',
      stars: 5,
    },
    {
      name: 'Marcus Vance',
      role: 'Founder at IndieCraft Studio',
      avatar: '🧔‍♂️',
      quote: 'Collaborating with Rishabh was the smoothest engineering sprint we ever had. He not only wrote impeccable TypeScript, but also gave our product a joyful, playful character that users rave about.',
      border: 'border-purple-400',
      shadow: 'shadow-pop-purple',
      stars: 5,
    },
    {
      name: 'Sarah Lin',
      role: 'Lead UI/UX Designer',
      avatar: '👩‍🎨',
      quote: 'Rarely do you find a developer who understands pixel precision and animation easing as deeply as a designer. Rishabh delivers code that matches the vision 100% on the first try!',
      border: 'border-pink-400',
      shadow: 'shadow-pop-pink',
      stars: 5,
    }
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop-amber">
            <SparklesIcon size={14} />
            <span>Word on the Street</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Client &amp; Peer <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">Praise</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            Real feedback from visionary founders, design leads, and engineering peers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onMouseEnter={() => soundFX.playPop()}
              className={`p-7 bg-slate-900 rounded-3xl border-2 ${t.border} ${t.shadow} flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200 group relative`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <StarIcon key={s} size={16} />
                ))}
              </div>

              {/* Speech Quote */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
