'use client';

import React from 'react';
import { soundFX } from './SoundEffects';
import { TrophyIcon, SparklesIcon } from './Icons';

type Milestone = {
  level: string;
  title: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  emoji: string;
  border: string;
  shadow: string;
};

export const ExperienceTimeline: React.FC = () => {
  const milestones: Milestone[] = [
    {
      level: 'STAGE 04',
      title: 'React.js Developer Intern',
      role: 'Frontend & AI Tools Developer',
      company: 'Resolute.ai (Remote)',
      period: 'March 2025 – July 2025',
      description: 'Built high-performance, reusable React features and components for cutting-edge AI-powered web applications using React Hooks and Redux.',
      achievements: [
        'Built reusable React components and features for AI-powered web applications using React Hooks and Redux.',
        'Developed the frontend of an AI image-based tile counting tool and contributed to an AI text extraction system.',
        'Improved performance and maintainability with lazy loading, code splitting, and reusable component patterns.'
      ],
      emoji: '⚡',
      border: 'border-cyan-400',
      shadow: 'shadow-pop-cyan',
    },
    {
      level: 'STAGE 03',
      title: 'Machine Learning Intern',
      role: 'Deep Learning & Vision Research',
      company: 'IBM (Remote)',
      period: 'February 2025',
      description: 'Researched and trained multi-class computer vision models for medical diagnostic imagery using TensorFlow and Python.',
      achievements: [
        'Trained a multi-class TensorFlow model in Python to classify lung images (Viral Pneumonia, Bacterial Pneumonia, COVID-19, Normal).',
        'Achieved 80% validation accuracy on clinical lung datasets through data augmentation and fine-tuning.'
      ],
      emoji: '🧠',
      border: 'border-purple-400',
      shadow: 'shadow-pop-purple',
    },
    {
      level: 'STAGE 02',
      title: 'Master of Computer Applications (MCA)',
      role: 'Specialization in AI & Machine Learning',
      company: 'University of Petroleum and Energy Studies (UPES), Dehradun',
      period: 'Jul 2023 – Jul 2025',
      description: 'Master\'s program focused on AI agent architectures, machine learning models, distributed systems, and modern full-stack web technologies.',
      achievements: [
        'Specialized in AI & ML workflows, natural language processing, and modern JavaScript/TypeScript ecosystems.',
        'Engineered GrookAgent multi-agent AI platform using Next.js and Ollama as a flagship project.'
      ],
      emoji: '🎓',
      border: 'border-emerald-400',
      shadow: 'shadow-pop',
    },
    {
      level: 'STAGE 01',
      title: 'Bachelor of Computer Applications (BCA)',
      role: 'Computer Applications & Software Engineering',
      company: 'Tula\'s Institute, Dehradun',
      period: 'Jul 2020 – Jul 2023',
      description: 'Gained solid computer science foundations in Data Structures & Algorithms, Object-Oriented Programming, and database design.',
      achievements: [
        'Mastered foundational programming in Python, JavaScript, and database systems with SQL.',
        'Built early web projects and established core principles of clean code architecture.'
      ],
      emoji: '🌱',
      border: 'border-amber-400',
      shadow: 'shadow-pop-amber',
    }
  ];

  return (
    <section id="timeline" className="py-20 md:py-28 relative bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-emerald-400 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop">
            <TrophyIcon size={14} />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Work Experience &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">Education</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            From university foundations in Dehradun to remote developer internships at Resolute.ai and IBM.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative border-l-4 border-slate-700 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFX.playPop()}
              className="relative group"
            >
              {/* Timeline Level Node Badge */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-11 h-11 rounded-2xl bg-slate-900 border-2 border-white flex items-center justify-center text-xl shadow-pop-sm group-hover:scale-125 group-hover:rotate-12 transition-all duration-200">
                <span>{item.emoji}</span>
              </div>

              {/* Time Indicator on Left for Wide Screens */}
              <div className="hidden sm:block absolute -left-36 top-3 text-right w-24">
                <span className="text-xs font-mono font-bold text-cyan-400 block">{item.period.split(' – ')[0]}</span>
                <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase">{item.level}</span>
              </div>

              {/* Content Card */}
              <div className={`p-6 sm:p-7 bg-slate-900 rounded-2xl border-2 ${item.border} ${item.shadow} hover:-translate-y-1 transition-all duration-200`}>
                <div className="sm:hidden flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{item.period}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 px-2 py-0.5 bg-slate-800 rounded border border-slate-700">{item.level}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 bg-cyan-950/80 text-cyan-300 rounded-lg border border-cyan-400/40">
                    {item.company}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-400 mb-3">
                  {item.role} &bull; <span className="font-mono text-slate-300">{item.period}</span>
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Achievements list */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {item.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400">
                      <span className="text-emerald-400 mt-0.5 font-bold">✔</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
